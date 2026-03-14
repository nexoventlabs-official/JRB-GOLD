# Production Deployment Guide - JRB Gold Payment System

## Overview
This guide covers deploying the JRB Gold application with payment callback functionality to production.

## Architecture
- **Frontend**: React SPA (Static files)
- **Backend**: Express server (Handles payment callbacks)
- **Database**: LocalStorage (for demo) / Replace with real DB in production

## Deployment Options

### Option 1: Single Server Deployment (Recommended)

#### Step 1: Prepare Production Build
```bash
# Build the React frontend
npm run build

# This creates a 'dist' folder with static files
```

#### Step 2: Update Production Environment Variables
Create `.env.production`:
```env
# Production Payment Configuration
VITE_MERCHANT_ID=your_production_merchant_id
VITE_MERCHANT_KEY=your_production_merchant_key
VITE_PAYMENT_ENV=production
VITE_PAYTM_WEBSITE=your_website_name
VITE_PAYTM_INDUSTRY_TYPE=Retail
VITE_PAYTM_CHANNEL_ID=WEB

# Production URLs
VITE_BACKEND_URL=https://yourdomain.com
VITE_FRONTEND_URL=https://yourdomain.com

# Server Configuration
PORT=80
NODE_ENV=production
```

#### Step 3: Update server.js for Production
```javascript
// Add to server.js
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// In production, serve React build files
if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
  
  // Handle React Router (SPA)
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });
}
```

#### Step 4: Production Start Script
Add to `package.json`:
```json
{
  "scripts": {
    "start": "NODE_ENV=production node server.js",
    "build:prod": "npm run build && npm run start"
  }
}
```

### Option 2: Separate Frontend/Backend Deployment

#### Frontend (Netlify/Vercel/GitHub Pages)
```bash
# Build and deploy frontend
npm run build
# Upload 'dist' folder to your hosting service
```

#### Backend (Railway/Heroku/DigitalOcean)
```bash
# Deploy only server.js and dependencies
# Remove static file serving from server.js
```

## Hosting Platforms

### 1. Railway (Recommended - Easy & Free Tier)

#### Deploy to Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Railway Configuration:
- **Start Command**: `npm run start`
- **Environment Variables**: Add all production env vars
- **Domain**: Railway provides free subdomain

### 2. Heroku

#### Deploy to Heroku:
```bash
# Install Heroku CLI
# Create Heroku app
heroku create jrb-gold-app

# Set environment variables
heroku config:set VITE_MERCHANT_ID=your_merchant_id
heroku config:set VITE_MERCHANT_KEY=your_merchant_key
heroku config:set VITE_PAYMENT_ENV=production

# Deploy
git push heroku main
```

### 3. DigitalOcean Droplet

#### Server Setup:
```bash
# Create Ubuntu droplet
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone your repository
git clone your-repo-url
cd your-project

# Install dependencies
npm install

# Build production
npm run build

# Start with PM2
pm2 start server.js --name "jrb-gold"
pm2 startup
pm2 save
```

#### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Certificate (HTTPS)

### Using Let's Encrypt (Free):
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Paytm Production Configuration

### 1. Update Paytm Dashboard
- **Callback URL**: `https://yourdomain.com/payment/callback`
- **Website URL**: `https://yourdomain.com`
- **Environment**: Switch to Production

### 2. Get Production Credentials
- Login to Paytm Business Dashboard
- Get production Merchant ID and Key
- Update environment variables

## Database Migration (Optional)

### Replace LocalStorage with Real Database:
```javascript
// Example: MongoDB integration
const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: String,
  customerEmail: String,
  amount: Number,
  status: String,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
```

## Monitoring & Logging

### Add Logging:
```javascript
// server.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log payment callbacks
app.post('/payment/callback', (req, res) => {
  logger.info('Payment callback received', req.body);
  // ... rest of callback logic
});
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation added
- [ ] Error handling improved
- [ ] Logs monitoring setup

## Testing Production

### 1. Test Payment Flow:
1. Go to `https://yourdomain.com`
2. Add items to cart
3. Proceed to checkout
4. Complete payment on Paytm
5. Verify callback works
6. Check order status

### 2. Test Callback Endpoint:
```bash
curl -X POST https://yourdomain.com/payment/callback \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "ORDERID=TEST123&STATUS=TXN_SUCCESS&TXNID=TEST456"
```

## Troubleshooting

### Common Issues:
1. **Callback 404**: Check server routing
2. **CORS errors**: Update CORS configuration
3. **SSL issues**: Verify certificate installation
4. **Environment variables**: Check all vars are set
5. **Port conflicts**: Ensure correct port configuration

### Debug Commands:
```bash
# Check server status
pm2 status

# View logs
pm2 logs jrb-gold

# Restart server
pm2 restart jrb-gold
```

## Cost Estimation

### Railway (Recommended):
- **Free Tier**: $0/month (500 hours)
- **Pro Plan**: $5/month (unlimited)

### Heroku:
- **Free Tier**: Discontinued
- **Basic Plan**: $7/month

### DigitalOcean:
- **Basic Droplet**: $5/month
- **Domain**: $12/year
- **SSL**: Free (Let's Encrypt)

## Support

For deployment issues:
1. Check server logs
2. Verify environment variables
3. Test callback endpoint
4. Contact hosting support if needed

---

**Ready to deploy?** Choose your hosting platform and follow the specific steps above!