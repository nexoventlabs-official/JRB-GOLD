# 🚨 URGENT: Deploy Backend to Render

## The Issue
Your backend is showing "Not Found" because it's not deployed to Render yet. The frontend is trying to connect to `https://jrb-gold-backend.onrender.com` but that URL doesn't exist.

## 🚀 Deploy Backend NOW - Step by Step

### 1. Go to Render.com
- Visit: https://render.com
- Sign up/Login with GitHub

### 2. Create New Web Service
- Click **"New +"** → **"Web Service"**
- Connect your GitHub account
- Select repository: **`tmisgowthaamand/JRB-GOLD`**

### 3. Configure Service
- **Name**: `jrb-gold-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Environment Variables (CRITICAL)
Add these in Render dashboard:
```
NODE_ENV=production
FRONTEND_URL=https://jrb-gold-56cs.vercel.app
CORS_ORIGINS=https://jrb-gold-56cs.vercel.app,http://localhost:5173,http://localhost:8080,https://www.jrbgold.co.in
VITE_MERCHANT_ID=nfvifF32655861820763
VITE_MERCHANT_KEY=7x3aqULKxZe&Sj7V
VITE_PAYMENT_ENV=production
```

### 5. Deploy
- Click **"Create Web Service"**
- Wait 3-5 minutes for deployment
- Your backend URL will be: `https://jrb-gold-backend.onrender.com`

## ✅ Verify Deployment
Once deployed, test these URLs:
- Health check: `https://jrb-gold-backend.onrender.com/api/health`
- Root: `https://jrb-gold-backend.onrender.com/`
- Test callback: `https://jrb-gold-backend.onrender.com/test/callback`

## 🔧 If Backend URL is Different
If Render gives you a different URL (like `https://jrb-gold-backend-xyz.onrender.com`), update:

1. **Frontend environment**: Update `VITE_BACKEND_URL` in Vercel
2. **Payment service**: Update the backend URL
3. **Paytm dashboard**: Update callback URL

## 📱 Current Status
- ❌ **Backend**: Not deployed (causing 404)
- ✅ **Frontend**: Deployed on Vercel
- ⏳ **Payment**: Waiting for backend

**Deploy the backend now and your payment system will work!** 🎯