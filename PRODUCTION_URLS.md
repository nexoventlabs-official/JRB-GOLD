# Production URLs Configuration - JRB Gold

## 🌐 Your Production Domains

### Primary Domain (Custom Domain)
```
https://www.jrbgold.co.in
```
- Main website URL
- Payment callback redirect destination
- Customer-facing domain

### Vercel Domain (Backend API)
```
https://jrb-gold.vercel.app
```
- Vercel deployment URL
- Serverless API endpoint
- Payment callback handler

## 📡 Payment Callback Configuration

### Paytm Callback URL
Update in Paytm Dashboard:
```
https://jrb-gold.vercel.app/api/payment-callback
```

### Payment Flow
1. User completes payment on Paytm
2. Paytm sends POST to: `https://jrb-gold.vercel.app/api/payment-callback`
3. Serverless function redirects to: `https://www.jrbgold.co.in/payment/callback?status=...`
4. Customer sees result on your custom domain

## 🔧 Environment Variables

### Vercel Environment Variables
Set these in Vercel Dashboard:
```
VITE_BACKEND_URL=https://jrb-gold.vercel.app
VITE_FRONTEND_URL=https://www.jrbgold.co.in
VITE_PAYMENT_ENV=production
VITE_MERCHANT_ID=nfvifF32655861820763
VITE_MERCHANT_KEY=7x3aqULKxZe&Sj7V
VITE_PAYTM_WEBSITE=WEBSTAGING
VITE_PAYTM_INDUSTRY_TYPE=Retail
VITE_PAYTM_CHANNEL_ID=WEB
```

### Render Environment Variables (if using backend)
```
FRONTEND_URL=https://www.jrbgold.co.in
CORS_ORIGINS=https://jrb-gold.vercel.app,https://www.jrbgold.co.in,http://localhost:5173,http://localhost:8080
```

## 🔐 CORS Configuration

Allowed origins:
- `https://jrb-gold.vercel.app` (Vercel deployment)
- `https://www.jrbgold.co.in` (Custom domain)
- `http://localhost:5173` (Local development)
- `http://localhost:8080` (Local development alt port)

## 📋 Checklist for Production

### Vercel Setup
- [ ] Custom domain `www.jrbgold.co.in` configured in Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Latest code deployed
- [ ] Test API endpoint: `https://jrb-gold.vercel.app/api/payment-callback`

### Paytm Configuration
- [ ] Login to Paytm Business Dashboard
- [ ] Update callback URL to: `https://jrb-gold.vercel.app/api/payment-callback`
- [ ] Verify merchant ID and key are correct
- [ ] Switch to production mode (when ready)

### DNS Configuration
- [ ] Domain points to Vercel
- [ ] SSL certificate active
- [ ] Both `www` and non-www versions work

### Testing
- [ ] Test homepage: `https://www.jrbgold.co.in`
- [ ] Test API: `https://jrb-gold.vercel.app/api/payment-callback`
- [ ] Test payment flow end-to-end
- [ ] Verify callback redirects correctly

## 🧪 Test Endpoints

### Health Check
```bash
curl https://jrb-gold.vercel.app/api/payment-callback
```

Expected response:
```json
{
  "status": "ok",
  "message": "JRB Gold Payment Callback Handler",
  "endpoint": "/api/payment-callback"
}
```

### Test Payment Callback
```bash
curl -X POST https://jrb-gold.vercel.app/api/payment-callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456&RESPCODE=01&RESPMSG=Success"
```

Should redirect to:
```
https://www.jrbgold.co.in/payment/callback?ORDERID=TEST123&STATUS=TXN_SUCCESS...
```

## 🚀 Deployment Status

- ✅ URLs updated in all configuration files
- ✅ Payment service configured
- ✅ Backend CORS configured
- ✅ Vercel serverless function ready
- ⏳ Waiting for deployment

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoint
4. Check Paytm callback URL configuration
5. Verify DNS settings for custom domain

---

**All URLs have been updated to use your production domains!** 🎯