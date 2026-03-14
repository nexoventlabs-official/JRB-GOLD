// Backend Server for JRB Gold - Paytm Payment Gateway
// Uses Paytm classic form flow with official paytmchecksum SDK

import express from 'express';
import { createRequire } from 'module';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import the official Paytm checksum library (CommonJS module)
const require = createRequire(import.meta.url);
const PaytmChecksum = require('paytmchecksum');

const app = express();
const PORT = process.env.PORT || 3001;

// Unified frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://jrb-gold-topaz.vercel.app';

// Paytm credentials - Strip quotes if present
const PAYTM_MERCHANT_ID = (process.env.PAYTM_MERCHANT_ID || '').replace(/^["']|["']$/g, '');
const PAYTM_MERCHANT_KEY = (process.env.PAYTM_MERCHANT_KEY || '').replace(/^["']|["']$/g, '');
const PAYTM_ENVIRONMENT = process.env.PAYTM_ENVIRONMENT || 'production';
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || (PAYTM_ENVIRONMENT === 'production' ? 'DEFAULT' : 'WEBSTAGING');
const PAYTM_INDUSTRY_TYPE = process.env.PAYTM_INDUSTRY_TYPE || 'Retail';
const PAYTM_CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || 'WEB';

// Gateway URLs
const PAYTM_HOST = PAYTM_ENVIRONMENT === 'production' ? 'securegw.paytm.in' : 'securegw-stage.paytm.in';
const PAYTM_TXN_URL = `https://${PAYTM_HOST}/order/process`;

// In-memory store for payment params (used for redirect page)
const pendingPayments = new Map();

// ============================
// CORS Middleware
// ============================
let corsOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'https://jrb-gold-topaz.vercel.app',
  'https://www.jrbgold.co.in',
  'https://jrbgold.co.in'
];

if (process.env.CORS_ORIGINS) {
  corsOrigins = process.env.CORS_ORIGINS
    .split(',')
    .map(s => s.trim().replace(/\/+$/, '').replace(/^CORS_ORIGINS=/, ''));
}

const frontendOrigin = FRONTEND_URL.replace(/\/+$/, '');
if (!corsOrigins.includes(frontendOrigin)) {
  corsOrigins.push(frontendOrigin);
}

console.log('CORS allowed origins:', corsOrigins);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && corsOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// API Endpoints
// ============================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'JRB Gold Payment Backend is running',
    version: 'v4-classic-flow',
    environment: PAYTM_ENVIRONMENT,
    gateway: PAYTM_HOST,
    corsOrigins: corsOrigins,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/config', (req, res) => {
  const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';
  res.json({
    backendUrl,
    paymentEnvironment: PAYTM_ENVIRONMENT,
    usdToInrRate: parseFloat(process.env.USD_TO_INR_RATE) || 83.5,
  });
});

app.get('/', (req, res) => {
  res.status(200).send('JRB Gold Backend is Live');
});

// ============================
// Initiate Payment — Classic Paytm flow
// 1. Generate checksum on flat params object
// 2. Store params, return redirect URL to our form page
// 3. Form page auto-submits to Paytm gateway
// ============================
app.post('/api/initiate-payment', async (req, res) => {
  try {
    const { orderId, amount, customerId, email, mobile } = req.body;

    console.log(`\n=== INITIATING PAYMENT ===`);
    console.log(`Order: ${orderId}, Amount: ${amount}, Customer: ${customerId}`);

    if (!orderId || !amount || !customerId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: orderId, amount, customerId'
      });
    }

    const M_ID = PAYTM_MERCHANT_ID.trim();
    const M_KEY = PAYTM_MERCHANT_KEY.trim();

    if (!M_ID || !M_KEY) {
      throw new Error('Paytm credentials not configured');
    }

    const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';
    const ordIdStr = orderId.toString().trim();
    const txnAmount = parseFloat(amount).toFixed(2);
    const custId = customerId.toString().replace(/[^a-zA-Z0-9_@.]/g, '_').substring(0, 64);

    // Build flat params object for classic Paytm flow
    const paytmParams = {
      MID: M_ID,
      WEBSITE: PAYTM_WEBSITE.trim(),
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE.trim(),
      CHANNEL_ID: PAYTM_CHANNEL_ID.trim(),
      ORDER_ID: ordIdStr,
      CUST_ID: custId,
      TXN_AMOUNT: txnAmount,
      CALLBACK_URL: `${backendUrl}/payment/callback`,
    };

    if (email) paytmParams.EMAIL = email;
    if (mobile) paytmParams.MOBILE_NO = mobile;

    console.log('Payment params:', JSON.stringify(paytmParams, null, 2));

    // Generate checksum on the flat params object (NOT JSON string)
    const checksum = await PaytmChecksum.generateSignature(paytmParams, M_KEY);
    paytmParams.CHECKSUMHASH = checksum;

    console.log('Checksum generated:', checksum.substring(0, 30) + '...');

    // Store params for the redirect page
    pendingPayments.set(ordIdStr, {
      params: paytmParams,
      createdAt: Date.now()
    });

    // Clean up old entries (older than 30 minutes)
    const thirtyMinAgo = Date.now() - 30 * 60 * 1000;
    for (const [key, val] of pendingPayments) {
      if (val.createdAt < thirtyMinAgo) pendingPayments.delete(key);
    }

    const redirectUrl = `${backendUrl}/payment/redirect/${ordIdStr}`;
    console.log('Redirect URL:', redirectUrl);
    console.log('=== PAYMENT INITIATED SUCCESSFULLY ===\n');

    res.json({
      success: true,
      redirectUrl: redirectUrl,
      orderId: ordIdStr,
      environment: PAYTM_ENVIRONMENT
    });

  } catch (error) {
    console.error('Error initiating payment:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to initiate payment'
    });
  }
});

// ============================
// Payment redirect page — auto-submitting form to Paytm
// ============================
app.get('/payment/redirect/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const payment = pendingPayments.get(orderId);

  if (!payment) {
    return res.status(404).send(`
      <html><body style="font-family:Arial;text-align:center;padding:50px;">
        <h2>Payment session expired or not found</h2>
        <p>Order ID: ${orderId}</p>
        <p><a href="${FRONTEND_URL}">Return to JRB Gold</a></p>
      </body></html>
    `);
  }

  const params = payment.params;

  // Build hidden form fields
  const hiddenFields = Object.entries(params)
    .map(([key, value]) => `<input type="hidden" name="${key}" value="${String(value).replace(/"/g, '&quot;')}" />`)
    .join('\n      ');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Redirecting to Payment Gateway...</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #d4af37; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    </head>
    <body>
      <div class="loader"></div>
      <h2>Redirecting to Paytm Payment Gateway...</h2>
      <p>Please wait, do not close this window.</p>
      <form id="paytmForm" method="POST" action="${PAYTM_TXN_URL}">
        ${hiddenFields}
      </form>
      <script>document.getElementById('paytmForm').submit();</script>
    </body>
    </html>
  `);

  // Remove from pending after serving
  pendingPayments.delete(orderId);
});

// ============================
// Paytm POST callback handler
// ============================
app.post('/payment/callback', async (req, res) => {
  console.log('\n=== PAYMENT CALLBACK RECEIVED ===');
  console.log('Body:', req.body);

  const body = req.body || {};

  // Verify checksum
  if (body.CHECKSUMHASH && PAYTM_MERCHANT_KEY) {
    try {
      const paramsForVerification = { ...body };
      delete paramsForVerification.CHECKSUMHASH;

      const isValid = await PaytmChecksum.verifySignature(
        paramsForVerification,
        PAYTM_MERCHANT_KEY,
        body.CHECKSUMHASH
      );
      console.log('Checksum verification:', isValid ? 'VALID' : 'INVALID');
    } catch (error) {
      console.error('Checksum verification error:', error.message);
    }
  }

  const ORDERID = body.ORDERID || '';
  const TXNID = body.TXNID || '';
  const TXNAMOUNT = body.TXNAMOUNT || '';
  const STATUS = body.STATUS || '';
  const RESPCODE = body.RESPCODE || '';
  const RESPMSG = body.RESPMSG || '';
  const TXNDATE = body.TXNDATE || '';
  const GATEWAYNAME = body.GATEWAYNAME || '';
  const BANKNAME = body.BANKNAME || '';
  const PAYMENTMODE = body.PAYMENTMODE || '';

  console.log('Payment result:', { ORDERID, TXNID, STATUS, RESPCODE, RESPMSG });

  // Redirect to frontend with payment status
  const callbackUrl = new URL('/payment/callback', FRONTEND_URL);

  if (ORDERID) callbackUrl.searchParams.set('ORDERID', ORDERID);
  if (TXNID) callbackUrl.searchParams.set('TXNID', TXNID);
  if (TXNAMOUNT) callbackUrl.searchParams.set('TXNAMOUNT', TXNAMOUNT);

  if (STATUS) {
    callbackUrl.searchParams.set('STATUS', STATUS);
  } else if (RESPCODE) {
    callbackUrl.searchParams.set('STATUS', RESPCODE === '01' ? 'TXN_SUCCESS' : 'TXN_FAILURE');
  } else {
    callbackUrl.searchParams.set('STATUS', 'UNKNOWN');
  }

  if (RESPCODE) callbackUrl.searchParams.set('RESPCODE', RESPCODE);
  if (RESPMSG) callbackUrl.searchParams.set('RESPMSG', RESPMSG);
  if (TXNDATE) callbackUrl.searchParams.set('TXNDATE', TXNDATE);
  if (GATEWAYNAME) callbackUrl.searchParams.set('GATEWAYNAME', GATEWAYNAME);
  if (BANKNAME) callbackUrl.searchParams.set('BANKNAME', BANKNAME);
  if (PAYMENTMODE) callbackUrl.searchParams.set('PAYMENTMODE', PAYMENTMODE);

  console.log('Redirecting to:', callbackUrl.toString());
  console.log('=== CALLBACK PROCESSED ===\n');
  res.redirect(callbackUrl.toString());
});

// ============================
// Test endpoints
// ============================
app.get('/test/callback', (req, res) => {
  res.redirect(`${FRONTEND_URL}/payment/callback?ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456&TXNAMOUNT=1000.00&RESPCODE=01&RESPMSG=Test%20Success`);
});

app.get('/test/callback-fail', (req, res) => {
  res.redirect(`${FRONTEND_URL}/payment/callback?ORDERID=TEST789&STATUS=TXN_FAILURE&TXNID=TEST012&TXNAMOUNT=500.00&RESPCODE=330&RESPMSG=Test%20Failure`);
});

app.get('/test/checksum', async (req, res) => {
  try {
    const testParams = {
      MID: PAYTM_MERCHANT_ID,
      WEBSITE: PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE,
      CHANNEL_ID: PAYTM_CHANNEL_ID,
      ORDER_ID: 'TEST_' + Date.now(),
      CUST_ID: 'test_user',
      TXN_AMOUNT: '1.00',
      CALLBACK_URL: `${process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com'}/payment/callback`,
    };

    const checksum = await PaytmChecksum.generateSignature(testParams, PAYTM_MERCHANT_KEY);

    // Self-verify the checksum
    const isValid = await PaytmChecksum.verifySignature(testParams, PAYTM_MERCHANT_KEY, checksum);

    // Debug: show key details (masked) to verify key on Render
    const keyHex = Buffer.from(PAYTM_MERCHANT_KEY).toString('hex');

    res.json({
      success: true,
      merchantId: PAYTM_MERCHANT_ID,
      merchantKeyLength: PAYTM_MERCHANT_KEY.length,
      merchantKeyPreview: PAYTM_MERCHANT_KEY.substring(0, 4) + '****' + PAYTM_MERCHANT_KEY.substring(PAYTM_MERCHANT_KEY.length - 4),
      merchantKeyHex: keyHex.substring(0, 8) + '...' + keyHex.substring(keyHex.length - 8),
      checksumGenerated: checksum.substring(0, 30) + '...',
      selfVerified: isValid,
      gateway: PAYTM_HOST,
      txnUrl: PAYTM_TXN_URL,
      website: PAYTM_WEBSITE,
      message: 'Checksum generation working (flat params)'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    version: 'v4-classic-flow',
    endpoints: {
      health: '/api/health',
      config: '/api/config',
      initiatePayment: '/api/initiate-payment (POST)',
      paymentRedirect: '/payment/redirect/:orderId (GET)',
      callback: '/payment/callback (POST)',
      testSuccess: '/test/callback',
      testFail: '/test/callback-fail',
      testChecksum: '/test/checksum'
    },
    frontend: FRONTEND_URL
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`JRB Gold Backend running on port ${PORT}`);
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Gateway: ${PAYTM_HOST}`);
  console.log(`Txn URL: ${PAYTM_TXN_URL}`);
  console.log(`MID: ${PAYTM_MERCHANT_ID ? PAYTM_MERCHANT_ID.substring(0, 8) + '...' : 'NOT SET'}`);
  console.log(`Key: ${PAYTM_MERCHANT_KEY ? 'SET (' + PAYTM_MERCHANT_KEY.length + ' chars)' : 'NOT SET'}`);
  console.log(`Website: ${PAYTM_WEBSITE}`);
  console.log(`Environment: ${PAYTM_ENVIRONMENT}`);
  console.log(`Backend URL: ${process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com'}`);
  console.log('Server ready');
});
