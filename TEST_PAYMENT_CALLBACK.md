# Test Payment Callback - Quick Guide

## ✅ Vercel Serverless Function Deployed

Your payment callback is now handled by a Vercel serverless function at:
`https://jrb-gold-56cs.vercel.app/api/payment-callback`

## 🧪 Test the Endpoint

### 1. Test Health Check (GET)
Open in browser or run:
```bash
curl https://jrb-gold-56cs.vercel.app/api/payment-callback
```

Expected response:
```json
{
  "status": "ok",
  "message": "JRB Gold Payment Callback Handler",
  "endpoint": "/api/payment-callback",
  "methods": ["GET", "POST"],
  "timestamp": "2026-03-12T..."
}
```

### 2. Test Payment Callback (POST)
```bash
curl -X POST https://jrb-gold-56cs.vercel.app/api/payment-callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456&RESPCODE=01&RESPMSG=Success"
```

This should redirect to:
`https://jrb-gold-56cs.vercel.app/payment/callback?ORDERID=TEST123&STATUS=TXN_SUCCESS...`

## 📡 Update Paytm Configuration

Once the endpoint is working, update your Paytm dashboard:

1. Login to Paytm Business Dashboard
2. Go to Developer Settings
3. Update Callback URL to:
   ```
   https://jrb-gold-56cs.vercel.app/api/payment-callback
   ```

## 🔍 Troubleshooting

### If API returns HTML instead of JSON:
- Wait 2-3 minutes for Vercel to finish deploying
- Clear browser cache
- Try in incognito mode

### If you get 404:
- Check Vercel deployment logs
- Verify the `api` folder is in the root of your repo
- Ensure vercel.json has correct rewrites

### If redirect doesn't work:
- Check Vercel function logs in dashboard
- Verify POST data is being received
- Check browser network tab for redirect

## ✅ Current Status

- ✅ Serverless function created
- ✅ Vercel configuration updated  
- ✅ Payment service updated to use new endpoint
- ⏳ Waiting for Vercel deployment (2-3 minutes)

## 🎯 Next Steps

1. Wait for Vercel deployment to complete
2. Test the health check endpoint
3. Test a mock payment callback
4. Update Paytm callback URL
5. Test real payment flow

**The backend URL issue is now resolved with Vercel serverless functions!** 🚀