# JRB Gold Backend - Payment Callback Handler

## Overview
Express.js backend server that handles Paytm payment callbacks and redirects to the Vercel frontend.

## Features
- ✅ Handles POST callbacks from Paytm
- ✅ CORS configured for multiple domains
- ✅ Redirects to Vercel frontend with query parameters
- ✅ Health check endpoint
- ✅ Test callback endpoint

## Deployment to Render

### Option 1: Using render.yaml (Recommended)
1. Push this backend folder to your GitHub repo
2. Go to Render.com → New Web Service
3. Connect your GitHub repo
4. Select **Root Directory**: `backend`
5. Render will automatically use the `render.yaml` configuration

### Option 2: Manual Setup
1. Go to Render.com → New Web Service
2. Connect your GitHub repo
3. Configure:
   - **Name**: `jrb-gold-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Environment Variables
Add these in Render dashboard or they're auto-configured via render.yaml:
```
NODE_ENV=production
FRONTEND_URL=https://jrb-gold-56cs.vercel.app
CORS_ORIGINS=https://jrb-gold-56cs.vercel.app,http://localhost:5173,http://localhost:8080,https://www.jrbgold.co.in
VITE_MERCHANT_ID=nfvifF32655861820763
VITE_MERCHANT_KEY=7x3aqULKxZe&Sj7V
VITE_PAYMENT_ENV=production
```

## API Endpoints

### Health Check
```
GET /api/health
Response: {"status":"ok","message":"JRB Gold Payment Backend is running"}
```

### Payment Callback (Paytm)
```
POST /payment/callback
- Receives POST data from Paytm
- Redirects to frontend with query parameters
```

### Test Callback
```
GET /test/callback
- Simulates a successful payment callback
- Redirects to frontend with test data
```

### Root
```
GET /
Response: API information and available endpoints
```

## Local Development
```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:3001`

## Production URLs
- **Backend**: `https://jrb-gold-backend.onrender.com`
- **Frontend**: `https://jrb-gold-56cs.vercel.app`

## Payment Flow
1. User completes payment on Paytm
2. Paytm sends POST to `https://jrb-gold-backend.onrender.com/payment/callback`
3. Backend extracts payment data
4. Backend redirects to `https://jrb-gold-56cs.vercel.app/payment/callback?status=...`
5. Frontend shows payment result

## CORS Configuration
Configured to allow requests from:
- `https://jrb-gold-56cs.vercel.app` (Production frontend)
- `https://www.jrbgold.co.in` (Custom domain)
- `http://localhost:5173` (Local Vite dev)
- `http://localhost:8080` (Local Vite alt port)

## Dependencies
- `express`: Web server framework
- `cors`: Cross-origin resource sharing

## File Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── render.yaml        # Render deployment config
├── .env              # Environment variables
└── README.md         # This file
```