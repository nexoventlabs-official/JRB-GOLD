// Backend Server for JRB Gold - Paytm Payment Gateway
// Supports both Transaction API (modern) and Classic form flow
// Uses official paytmchecksum SDK

import express from 'express';
import https from 'https';
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

// In-memory store for payment params (used for classic flow redirect)
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
// Helper: make HTTPS POST request to Paytm
// ============================
function paytmPost(path, postData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(postData);
    const options = {
      hostname: PAYTM_HOST,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Invalid JSON from Paytm: ${body.substring(0, 500)}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Paytm API request timed out'));
    });
    req.write(data);
    req.end();
  });
}

// ============================
// API Endpoints
// ============================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'JRB Gold Payment Backend is running',
    version: 'v5-dual-flow',
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
// Initiate Payment — tries Transaction API first, falls back to classic
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

    // ---- Try Transaction API first ----
    console.log('Trying Transaction API...');
    try {
      const paytmBody = {
        requestType: 'Payment',
        mid: M_ID,
        websiteName: PAYTM_WEBSITE.trim(),
        orderId: ordIdStr,
        callbackUrl: `${backendUrl}/payment/callback`,
        txnAmount: {
          value: txnAmount,
          currency: 'INR'
        },
        userInfo: {
          custId: custId
        }
      };

      if (email) paytmBody.userInfo.email = email;
      if (mobile) paytmBody.userInfo.mobile = mobile;

      const checksum = await PaytmChecksum.generateSignature(
        JSON.stringify(paytmBody),
        M_KEY
      );

      const initUrl = `/theia/api/v1/initiateTransaction?mid=${M_ID}&orderId=${ordIdStr}`;
      const paytmResponse = await paytmPost(initUrl, {
        body: paytmBody,
        head: { signature: checksum }
      });

      console.log('Transaction API response:', JSON.stringify(paytmResponse, null, 2));

      if (paytmResponse.body?.resultInfo?.resultStatus === 'S') {
        const txnToken = paytmResponse.body.txnToken;
        const paymentPageUrl = `https://${PAYTM_HOST}/theia/api/v1/showPaymentPage?mid=${M_ID}&orderId=${ordIdStr}&txnToken=${txnToken}`;

        console.log('Transaction API SUCCESS - got txnToken');
        console.log('=== PAYMENT INITIATED (TXN API) ===\n');

        return res.json({
          success: true,
          redirectUrl: paymentPageUrl,
          orderId: ordIdStr,
          environment: PAYTM_ENVIRONMENT,
          flow: 'txn-api'
        });
      }

      const resultCode = paytmResponse.body?.resultInfo?.resultCode || 'UNKNOWN';
      const resultMsg = paytmResponse.body?.resultInfo?.resultMsg || 'Unknown';
      console.log(`Transaction API failed: ${resultCode} - ${resultMsg}`);
      console.log('Falling back to classic flow...');

    } catch (txnError) {
      console.log('Transaction API error:', txnError.message);
      console.log('Falling back to classic flow...');
    }

    // ---- Fallback: Classic form flow ----
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

    console.log('Classic flow params:', JSON.stringify(paytmParams, null, 2));

    // Generate checksum on flat params object
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
    console.log('=== PAYMENT INITIATED (CLASSIC) ===\n');

    res.json({
      success: true,
      redirectUrl: redirectUrl,
      orderId: ordIdStr,
      environment: PAYTM_ENVIRONMENT,
      flow: 'classic'
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
// Payment redirect page — auto-submitting form to Paytm (classic flow)
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
    const isValid = await PaytmChecksum.verifySignature(testParams, PAYTM_MERCHANT_KEY, checksum);

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

// Test Transaction API directly
app.get('/test/txn-api', async (req, res) => {
  try {
    const M_ID = PAYTM_MERCHANT_ID.trim();
    const M_KEY = PAYTM_MERCHANT_KEY.trim();
    const ordId = 'TEST_' + Date.now();
    const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';

    const paytmBody = {
      requestType: 'Payment',
      mid: M_ID,
      websiteName: PAYTM_WEBSITE.trim(),
      orderId: ordId,
      callbackUrl: `${backendUrl}/payment/callback`,
      txnAmount: {
        value: '1.00',
        currency: 'INR'
      },
      userInfo: {
        custId: 'test_user'
      }
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      M_KEY
    );

    const initUrl = `/theia/api/v1/initiateTransaction?mid=${M_ID}&orderId=${ordId}`;
    const paytmResponse = await paytmPost(initUrl, {
      body: paytmBody,
      head: { signature: checksum }
    });

    res.json({
      success: paytmResponse.body?.resultInfo?.resultStatus === 'S',
      paytmResponse: paytmResponse,
      callbackUrl: `${backendUrl}/payment/callback`,
      orderId: ordId
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    version: 'v5-dual-flow',
    endpoints: {
      health: '/api/health',
      config: '/api/config',
      initiatePayment: '/api/initiate-payment (POST)',
      paymentRedirect: '/payment/redirect/:orderId (GET)',
      callback: '/payment/callback (POST)',
      testSuccess: '/test/callback',
      testFail: '/test/callback-fail',
      testChecksum: '/test/checksum',
      testTxnApi: '/test/txn-api'
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
