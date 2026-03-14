# JRB Gold Backend - Payment Gateway Server

## Overview
Express.js backend that handles Paytm payment integration — checksum generation, payment form serving, and callback handling.

## Deployment to Render

### Setup
1. Go to Render.com → New Web Service
2. Connect your GitHub repo: `nexoventlabs-official/JRB-GOLD`
3. Configure:
   - **Name**: `jrb-gold-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

### Environment Variables (set in Render Dashboard)
```
NODE_ENV=production
BACKEND_URL=https://jrb-gold-zvna.onrender.com
FRONTEND_URL=https://jrb-gold-topaz.vercel.app
CORS_ORIGINS=https://jrb-gold-topaz.vercel.app,https://www.jrbgold.co.in,https://jrbgold.co.in
PAYTM_MERCHANT_ID=<your-merchant-id>
PAYTM_MERCHANT_KEY=<your-merchant-key>
PAYTM_ENVIRONMENT=production
PAYTM_WEBSITE=DEFAULT
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB
```

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Health check (text) |
| GET | `/api/health` | Health check (JSON) |
| GET | `/api/config` | Non-sensitive config for frontend |
| POST | `/api/initiate-payment` | Generate checksum, return redirect URL |
| GET | `/payment/redirect/:orderId` | Serve auto-submitting form to Paytm |
| POST | `/payment/callback` | Receive Paytm callback, redirect to frontend |
| GET | `/test/callback` | Test success callback |
| GET | `/test/callback-fail` | Test failure callback |
| GET | `/test/checksum` | Test checksum generation |

## Local Development
```bash
cd backend
npm install
node server.js
```
Server runs on `http://localhost:3001`

## Payment Flow
1. Frontend calls `POST /api/initiate-payment` with order details
2. Backend generates Paytm checksum, stores params, returns redirect URL
3. Browser loads `/payment/redirect/:orderId` — auto-submitting form to Paytm
4. User completes payment on Paytm
5. Paytm POSTs to `/payment/callback`
6. Backend verifies checksum, redirects to frontend with payment status

## Dependencies
- `express` — Web server
- `cors` — Cross-origin support
- `dotenv` — Environment variables
- `paytmchecksum` — Official Paytm checksum SDK
