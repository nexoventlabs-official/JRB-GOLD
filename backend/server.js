// Backend Server for JRB Gold - Paytm Payment Gateway
// Uses Paytm Transaction API (modern flow) with official paytmchecksum SDK

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
const PAYTM_BASE_URL = `https://${PAYTM_HOST}`;

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
          reject(new Error(`Invalid JSON from Paytm: ${body.substring(0, 200)}`));
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
    version: 'v3-txn-api',
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
// Initiate Payment — Paytm Transaction API (modern flow)
// 1. Calls /theia/api/v1/initiateTransaction to get txnToken
// 2. Returns redirect URL to Paytm payment page with txnToken
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

    // Build body for initiateTransaction API
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

    console.log('Transaction body:', JSON.stringify(paytmBody, null, 2));

    // Generate checksum on the body (as JSON string)
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmBody),
      M_KEY
    );
    console.log('Checksum generated:', checksum.substring(0, 30) + '...');

    // Call Paytm initiateTransaction API
    const initUrl = `/theia/api/v1/initiateTransaction?mid=${M_ID}&orderId=${ordIdStr}`;
    console.log('Calling Paytm API:', initUrl);

    const paytmResponse = await paytmPost(initUrl, {
      body: paytmBody,
      head: {
        signature: checksum
      }
    });

    console.log('Paytm response:', JSON.stringify(paytmResponse, null, 2));

    if (paytmResponse.body?.resultInfo?.resultStatus === 'S') {
      // Success — got txnToken
      const txnToken = paytmResponse.body.txnToken;
      console.log('Got txnToken:', txnToken.substring(0, 30) + '...');

      // Build redirect URL to Paytm payment page
      const paymentPageUrl = `${PAYTM_BASE_URL}/theia/api/v1/showPaymentPage?mid=${M_ID}&orderId=${ordIdStr}&txnToken=${txnToken}`;

      console.log('Payment page URL generated');
      console.log('=== PAYMENT INITIATED SUCCESSFULLY ===\n');

      res.json({
        success: true,
        redirectUrl: paymentPageUrl,
        orderId: ordIdStr,
        environment: PAYTM_ENVIRONMENT
      });
    } else {
      // Paytm returned an error
      const resultMsg = paytmResponse.body?.resultInfo?.resultMsg || 'Unknown error from Paytm';
      const resultCode = paytmResponse.body?.resultInfo?.resultCode || 'UNKNOWN';
      console.error('Paytm initiation failed:', resultCode, resultMsg);
      console.error('Full response:', JSON.stringify(paytmResponse));

      res.status(400).json({
        success: false,
        error: `Paytm: ${resultMsg} (${resultCode})`,
        paytmResponse: paytmResponse
      });
    }

  } catch (error) {
    console.error('Error initiating payment:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to initiate payment'
    });
  }
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
    const testBody = {
      requestType: 'Payment',
      mid: PAYTM_MERCHANT_ID,
      websiteName: PAYTM_WEBSITE,
      orderId: 'TEST_' + Date.now(),
      callbackUrl: `${process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com'}/payment/callback`,
      txnAmount: { value: '1.00', currency: 'INR' },
      userInfo: { custId: 'test_user' }
    };

    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(testBody), PAYTM_MERCHANT_KEY);

    res.json({
      success: true,
      merchantId: PAYTM_MERCHANT_ID,
      merchantKeyLength: PAYTM_MERCHANT_KEY.length,
      checksumGenerated: checksum.substring(0, 30) + '...',
      gateway: PAYTM_HOST,
      website: PAYTM_WEBSITE,
      message: 'Checksum generation working'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({
    message: 'JRB Gold Payment Backend API',
    version: 'v3-txn-api',
    endpoints: {
      health: '/api/health',
      config: '/api/config',
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
  console.log(`JRB Gold Backend running on port ${PORT}`);
  console.log(`Frontend: ${FRONTEND_URL}`);
  console.log(`Gateway: ${PAYTM_HOST}`);
  console.log(`MID: ${PAYTM_MERCHANT_ID ? PAYTM_MERCHANT_ID.substring(0, 8) + '...' : 'NOT SET'}`);
  console.log(`Key: ${PAYTM_MERCHANT_KEY ? 'SET (' + PAYTM_MERCHANT_KEY.length + ' chars)' : 'NOT SET'}`);
  console.log(`Website: ${PAYTM_WEBSITE}`);
  console.log(`Environment: ${PAYTM_ENVIRONMENT}`);
  console.log(`Backend URL: ${process.env.BACKEND_URL || 'https://jrb-gold-zvna.onrender.com'}`);
  console.log('Server ready');
});
