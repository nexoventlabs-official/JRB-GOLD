// Backend Server for JRB Gold - Payment Callback Handler + Checksum Generation
// Deploy this to Render
// Uses OFFICIAL paytmchecksum npm package for correct checksum generation

import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import the official Paytm checksum library (CommonJS module)
const require = createRequire(import.meta.url);
const PaytmChecksum = require('paytmchecksum');

const app = express();
const PORT = process.env.PORT || 3001;

// Unified frontend URL — MUST match where the app is actually deployed
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://jrb-gold-topaz.vercel.app';

// Paytm credentials (from environment) - Strip quotes if present
const PAYTM_MERCHANT_ID = (process.env.PAYTM_MERCHANT_ID || '').replace(/^["']|["']$/g, '');
const PAYTM_MERCHANT_KEY = (process.env.PAYTM_MERCHANT_KEY || '').replace(/^["']|["']$/g, '');
const PAYTM_ENVIRONMENT = process.env.PAYTM_ENVIRONMENT || 'production';

// Paytm config defaults
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE ||
  (PAYTM_ENVIRONMENT === 'production' ? 'DEFAULT' : 'WEBSTAGING');

const PAYTM_INDUSTRY_TYPE = process.env.PAYTM_INDUSTRY_TYPE || 'Retail';

const PAYTM_CHANNEL_ID = process.env.PAYTM_CHANNEL_ID || 'WEB';

// ============================
// Middleware
// ============================

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
  : [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://jrb-gold-topaz.vercel.app',
    'https://www.jrbgold.co.in',
    'https://jrbgold.co.in'
  ];

console.log('CORS allowed origins:', corsOrigins);

// Handle CORS — explicit preflight + origin matching
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'JRB Gold Payment Backend is running',
    environment: PAYTM_ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

// Config endpoint — serves non-sensitive config to the frontend
app.get('/api/config', (req, res) => {
  const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';
  res.json({
    backendUrl,
    paymentEnvironment: PAYTM_ENVIRONMENT,
    usdToInrRate: parseFloat(process.env.USD_TO_INR_RATE) || 83.5,
  });
});

// Root path handler for Render
app.get('/', (req, res) => {
  res.status(200).send('JRB Gold Backend is Live');
});

// ============================
// Paytm Gateway Base URLs
// ============================
const PAYTM_BASE_URL = PAYTM_ENVIRONMENT === 'production'
  ? 'https://securegw.paytm.in'
  : 'https://securegw-stage.paytm.in';

// In-memory store for pending payment params (short-lived, keyed by orderId)
const pendingPayments = new Map();

// ============================
// Core Payment Function — Generates checksum for /order/process form POST
// ============================
async function createPaytmTransaction(orderId, amount, customerId, email, mobile) {
  const M_ID = PAYTM_MERCHANT_ID.trim();
  const M_KEY = PAYTM_MERCHANT_KEY.trim();

  if (!M_ID || !M_KEY) {
    throw new Error('Paytm credentials not properly configured in environment');
  }

  const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';
  const callbackUrl = `${backendUrl}/payment/callback`;

  const ordIdStr = orderId.toString().trim();
  const txnAmount = parseFloat(amount).toFixed(2);
  const custId = customerId.toString().replace(/[^a-zA-Z0-9_@.]/g, '_').substring(0, 64);

  // Build flat params for /order/process (old but working flow)
  const paytmParams = {
    MID: M_ID,
    ORDER_ID: ordIdStr,
    CUST_ID: custId,
    TXN_AMOUNT: txnAmount,
    CHANNEL_ID: PAYTM_CHANNEL_ID.trim(),
    WEBSITE: PAYTM_WEBSITE.trim(),
    CALLBACK_URL: callbackUrl,
    INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE.trim()
  };

  if (email) paytmParams.EMAIL = email;
  if (mobile) paytmParams.MOBILE_NO = mobile;

  console.log('=== CHECKSUM GENERATION ===');
  console.log('Order ID:', ordIdStr);
  console.log('Amount:', txnAmount);
  console.log('Params for signing:', JSON.stringify(paytmParams, null, 2));
  console.log('Merchant Key length:', M_KEY.length);

  try {
    // Generate checksum using OFFICIAL Paytm SDK on flat params object
    const checksum = await PaytmChecksum.generateSignature(paytmParams, M_KEY);
    console.log('✅ Checksum generated:', checksum.substring(0, 30) + '...');

    // Self-verify
    const isValid = await PaytmChecksum.verifySignature(paytmParams, M_KEY, checksum);
    console.log('✅ Self-verification:', isValid ? 'PASSED' : 'FAILED');

    if (!isValid) {
      throw new Error('Internal checksum verification failed');
    }

    paytmParams.CHECKSUMHASH = checksum;

    const paytmGatewayUrl = `${PAYTM_BASE_URL}/order/process`;

    console.log('Gateway URL:', paytmGatewayUrl);
    console.log('=== CHECKSUM GENERATION COMPLETE ===');

    return {
      params: paytmParams,
      gatewayUrl: paytmGatewayUrl,
      environment: PAYTM_ENVIRONMENT
    };
  } catch (error) {
    console.error('❌ Checksum generation failed:', error.message);
    throw error;
  }
}

// ============================
// Initiate Payment Endpoint
// Returns a redirect URL pointing to our own /payment/redirect/:orderId
// which serves the auto-submitting form (eliminates frontend form corruption)
// ============================
app.post('/api/initiate-payment', async (req, res) => {
  try {
    const { orderId, amount, customerId, email, mobile } = req.body;

    console.log(`Initiating ${PAYTM_ENVIRONMENT} payment for Order ${orderId}`);

    if (!orderId || !amount || !customerId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: orderId, amount, customerId' 
      });
    }

    const transaction = await createPaytmTransaction(orderId, amount, customerId, email, mobile);

    // Store params in memory so /payment/redirect/:orderId can serve the form
    pendingPayments.set(orderId.toString().trim(), {
      params: transaction.params,
      gatewayUrl: transaction.gatewayUrl,
      createdAt: Date.now()
    });

    // Clean up old entries (older than 10 minutes)
    for (const [key, val] of pendingPayments.entries()) {
      if (Date.now() - val.createdAt > 10 * 60 * 1000) {
        pendingPayments.delete(key);
      }
    }

    const backendUrl = process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';
    const redirectUrl = `${backendUrl}/payment/redirect/${orderId.toString().trim()}`;

    console.log('Payment parameters generated, redirect URL:', redirectUrl);

    res.json({
      success: true,
      redirectUrl: redirectUrl,
      orderId: orderId.toString().trim(),
      environment: transaction.environment
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
// Payment Redirect — Serves auto-submitting HTML form to Paytm
// This ensures the EXACT signed params are submitted with no frontend corruption
// ============================
app.get('/payment/redirect/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const payment = pendingPayments.get(orderId);

  if (!payment) {
    console.error('No pending payment found for order:', orderId);
    return res.redirect(`${FRONTEND_URL}/checkout?error=payment_expired`);
  }

  // Remove from pending (one-time use)
  pendingPayments.delete(orderId);

  const { params, gatewayUrl } = payment;

  console.log('Serving payment form for order:', orderId);
  console.log('Gateway URL:', gatewayUrl);
  console.log('Form params:', Object.keys(params).join(', '));

  // Build auto-submitting HTML form
  let formFields = '';
  for (const key in params) {
    // HTML-escape the value to prevent XSS and preserve special chars like & + =
    const escapedValue = params[key].toString()
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    formFields += `    <input type="hidden" name="${key}" value="${escapedValue}">\n`;
  }

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Redirecting to Paytm...</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .container { text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #d4a537; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <div class="spinner"></div>
    <h2>Redirecting to Paytm Payment Gateway</h2>
    <p>Please wait, do not close this window...</p>
  </div>
  <form id="paytmForm" method="POST" action="${gatewayUrl}">
${formFields}  </form>
  <script>document.getElementById('paytmForm').submit();</script>
</body>
</html>`;

  res.send(html);
});

// ============================
// Paytm POST callback handler
// ============================
app.post('/payment/callback', async (req, res) => {
  console.log('Received Paytm POST callback:', req.body);
  
  const body = req.body || {};

  // Verify the checksum from Paytm using official SDK
  if (body.CHECKSUMHASH && PAYTM_MERCHANT_KEY) {
    try {
      // Create a copy without CHECKSUMHASH for verification
      const paramsForVerification = { ...body };
      delete paramsForVerification.CHECKSUMHASH;
      
      const isValidChecksum = await PaytmChecksum.verifySignature(
        paramsForVerification, 
        PAYTM_MERCHANT_KEY, 
        body.CHECKSUMHASH
      );
      console.log('Callback checksum verification:', isValidChecksum ? 'VALID ✅' : 'INVALID ❌');
      
      if (!isValidChecksum) {
        console.error('⚠️ CHECKSUM MISMATCH - Possible tampering or configuration issue');
      }
    } catch (error) {
      console.error('Checksum verification error:', error.message);
    }
  }

  const ORDERID = body.ORDERID || body.orderid || '';
  const TXNID = body.TXNID || body.txnid || '';
  const TXNAMOUNT = body.TXNAMOUNT || body.txnamount || '';
  const STATUS = body.STATUS || body.status || '';
  const RESPCODE = body.RESPCODE || body.respcode || '';
  const RESPMSG = body.RESPMSG || body.respmsg || '';
  const TXNDATE = body.TXNDATE || body.txndate || '';
  const GATEWAYNAME = body.GATEWAYNAME || body.gatewayname || '';
  const BANKNAME = body.BANKNAME || body.bankname || '';
  const PAYMENTMODE = body.PAYMENTMODE || body.paymentmode || '';

  console.log('Parsed callback data:', {
    ORDERID, TXNID, TXNAMOUNT, STATUS, RESPCODE, RESPMSG
  });

  // Build redirect URL to frontend
  const callbackUrl = new URL('/payment/callback', FRONTEND_URL);
  
  if (ORDERID) callbackUrl.searchParams.set('ORDERID', ORDERID);
  if (TXNID) callbackUrl.searchParams.set('TXNID', TXNID);
  if (TXNAMOUNT) callbackUrl.searchParams.set('TXNAMOUNT', TXNAMOUNT);
  
  // STATUS is critical — if Paytm didn't send it, infer from RESPCODE
  if (STATUS) {
    callbackUrl.searchParams.set('STATUS', STATUS);
  } else if (RESPCODE) {
    const inferredStatus = RESPCODE === '01' ? 'TXN_SUCCESS' : 'TXN_FAILURE';
    callbackUrl.searchParams.set('STATUS', inferredStatus);
    console.log(`STATUS missing, inferred as: ${inferredStatus} from RESPCODE: ${RESPCODE}`);
  } else {
    callbackUrl.searchParams.set('STATUS', 'UNKNOWN');
    console.warn('Both STATUS and RESPCODE missing from Paytm callback!');
  }

  if (RESPCODE) callbackUrl.searchParams.set('RESPCODE', RESPCODE);
  if (RESPMSG) callbackUrl.searchParams.set('RESPMSG', RESPMSG);
  if (TXNDATE) callbackUrl.searchParams.set('TXNDATE', TXNDATE);
  if (GATEWAYNAME) callbackUrl.searchParams.set('GATEWAYNAME', GATEWAYNAME);
  if (BANKNAME) callbackUrl.searchParams.set('BANKNAME', BANKNAME);
  if (PAYMENTMODE) callbackUrl.searchParams.set('PAYMENTMODE', PAYMENTMODE);

  console.log('Redirecting to frontend:', callbackUrl.toString());
  res.redirect(callbackUrl.toString());
});

// Test endpoint for payment callback
app.get('/test/callback', (req, res) => {
  const testCallbackUrl = `${FRONTEND_URL}/payment/callback?ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456&TXNAMOUNT=1000.00&RESPCODE=01&RESPMSG=Test%20Success`;
  res.redirect(testCallbackUrl);
});

// Test failure callback
app.get('/test/callback-fail', (req, res) => {
  const testCallbackUrl = `${FRONTEND_URL}/payment/callback?ORDERID=TEST789&STATUS=TXN_FAILURE&TXNID=TEST012&TXNAMOUNT=500.00&RESPCODE=330&RESPMSG=Test%20Failure`;
  res.redirect(testCallbackUrl);
});

// Debug endpoint — test checksum generation
app.get('/test/checksum', async (req, res) => {
  try {
    const testParams = {
      MID: PAYTM_MERCHANT_ID,
      ORDER_ID: 'TEST_' + Date.now(),
      TXN_AMOUNT: '1.00',
      CUST_ID: 'test_user',
      CHANNEL_ID: PAYTM_CHANNEL_ID,
      WEBSITE: PAYTM_WEBSITE,
      INDUSTRY_TYPE_ID: PAYTM_INDUSTRY_TYPE,
      CALLBACK_URL: `${process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com'}/payment/callback`
    };

    const checksum = await PaytmChecksum.generateSignature(testParams, PAYTM_MERCHANT_KEY);
    const isValid = await PaytmChecksum.verifySignature(testParams, PAYTM_MERCHANT_KEY, checksum);

    res.json({
      success: true,
      merchantId: PAYTM_MERCHANT_ID,
      merchantKeyLength: PAYTM_MERCHANT_KEY.length,
      merchantKeyContainsAmpersand: PAYTM_MERCHANT_KEY.includes('&'),
      checksumGenerated: checksum.substring(0, 30) + '...',
      selfVerification: isValid,
      baseUrl: PAYTM_BASE_URL,
      testParams,
      message: isValid 
        ? 'Checksum generation and verification working correctly ✅' 
        : 'Checksum verification failed! Check merchant key ❌'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      merchantKeyLength: PAYTM_MERCHANT_KEY ? PAYTM_MERCHANT_KEY.length : 0,
      merchantKeySet: !!PAYTM_MERCHANT_KEY
    });
  }
});

// Debug endpoint — test full payment flow (backend serves the form directly)
app.get('/test/pay', async (req, res) => {
  try {
    const orderId = 'TEST_' + Date.now();
    const transaction = await createPaytmTransaction(
      orderId,
      1.00,
      'TEST_USER',
      'test@example.com',
      '9999999999'
    );

    // Store and redirect through the same /payment/redirect/:orderId flow
    pendingPayments.set(orderId, {
      params: transaction.params,
      gatewayUrl: transaction.gatewayUrl,
      createdAt: Date.now()
    });

    res.redirect(`/payment/redirect/${orderId}`);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});

// Detailed API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    endpoints: {
      health: '/api/health',
      initiatePayment: '/api/initiate-payment (POST)',
      callback: '/payment/callback (POST)',
      testSuccess: '/test/callback',
      testFail: '/test/callback-fail',
      testChecksum: '/test/checksum'
    },
    frontend: FRONTEND_URL
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 JRB Gold Backend running on port ${PORT}`);
  console.log(`📡 Payment callback: http://localhost:${PORT}/payment/callback`);
  console.log(`💳 Payment initiation: http://localhost:${PORT}/api/initiate-payment`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔑 Merchant ID: ${PAYTM_MERCHANT_ID ? PAYTM_MERCHANT_ID.substring(0, 8) + '...' : 'NOT SET'}`);
  console.log(`🔐 Merchant Key: ${PAYTM_MERCHANT_KEY ? 'SET (' + PAYTM_MERCHANT_KEY.length + ' chars)' : 'NOT SET'}`);
  console.log(`🔐 Merchant Key contains &: ${PAYTM_MERCHANT_KEY.includes('&')}`);
  console.log(`🔐 Raw PAYTM_MERCHANT_KEY env: ${process.env.PAYTM_MERCHANT_KEY ? 'length=' + process.env.PAYTM_MERCHANT_KEY.length : 'UNDEFINED'}`);
  console.log(`🌍 Environment: ${PAYTM_ENVIRONMENT}`);
  console.log(`🌐 Website: ${PAYTM_WEBSITE}`);
  console.log(`📋 Channel: ${PAYTM_CHANNEL_ID}`);
  console.log(`🏭 Industry: ${PAYTM_INDUSTRY_TYPE}`);
  console.log(`🔗 Backend URL: ${process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com'}`);
  console.log(`✅ Server ready to accept connections`);
});