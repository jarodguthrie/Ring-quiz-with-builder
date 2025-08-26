# 🚀 Deployment Guide - Moissanite Ring Builder

Complete deployment instructions for production environments.

## 📋 Prerequisites

### Required Services
- **Frontend Hosting**: Vercel, Netlify, or AWS Amplify
- **Backend Hosting**: Railway, Render, Heroku, or AWS ECS  
- **Database**: MongoDB Atlas (recommended)
- **Domain**: Custom domain for professional branding

### Environment Variables

#### Frontend (.env)
```bash
REACT_APP_BACKEND_URL=https://your-api-domain.com
```

#### Backend (.env)
```bash
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/ring_builder
DB_NAME=ring_builder
CORS_ORIGINS=https://your-frontend-domain.com
```

## 🛠️ Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### 1. Backend on Railway
```bash
# 1. Create Railway account and install CLI
npm install -g @railway/cli
railway login

# 2. Deploy backend
cd backend
railway init
railway add

# 3. Set environment variables in Railway dashboard
MONGO_URL=your_mongodb_atlas_connection_string
DB_NAME=ring_builder

# 4. Deploy
railway up
```

#### 2. Frontend on Vercel
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy frontend
cd frontend
vercel

# 3. Set environment variable in Vercel dashboard
REACT_APP_BACKEND_URL=https://your-railway-backend.up.railway.app
```

### Option 2: Netlify + Render

#### 1. Backend on Render
1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variables in Render dashboard

#### 2. Frontend on Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `yarn build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

## 🔧 Production Configuration

### Frontend Optimizations

#### package.json
```json
{
  "scripts": {
    "build": "craco build",
    "analyze": "npm run build && npx bundle-analyzer build/static/js/*.js"
  }
}
```

#### .env.production
```bash
REACT_APP_BACKEND_URL=https://api.your-domain.com
GENERATE_SOURCEMAP=false
```

### Backend Optimizations

#### requirements.txt (add production packages)
```txt
gunicorn==21.2.0
uvicorn[standard]==0.25.0
python-multipart==0.0.9
```

#### Dockerfile (optional)
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Cluster
```bash
# 1. Sign up at https://mongodb.com/atlas
# 2. Create new cluster (M0 free tier for testing)
# 3. Create database user
# 4. Whitelist IP addresses (0.0.0.0/0 for development)
# 5. Get connection string
```

### 2. Connection String Format
```bash
mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/ring_builder?retryWrites=true&w=majority
```

### 3. Database Indexes (optional optimization)
```javascript
// Connect to MongoDB and create indexes
use ring_builder

db.stones.createIndex({ "cut": 1, "is_active": 1 })
db.settings.createIndex({ "personality_tags": 1, "is_active": 1 })
db.metals.createIndex({ "type": 1, "is_active": 1 })
db.configurations.createIndex({ "created_at": -1 })
```

## 🌐 Domain Setup

### 1. Frontend Domain
```bash
# For Vercel
vercel domains add your-domain.com

# For Netlify  
# Add custom domain in dashboard
```

### 2. Backend Domain (API subdomain)
```bash
# Create CNAME record
api.your-domain.com -> your-backend-host.com
```

### 3. SSL Certificates
- Vercel/Netlify: Automatic SSL
- Railway/Render: Automatic SSL
- Custom hosting: Use Let's Encrypt

## 🔒 Security Configuration

### CORS Setup
```python
# backend/server.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-domain.com",
        "https://www.your-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

### Environment Security
```bash
# Never commit these to git
echo ".env*" >> .gitignore
echo "*.log" >> .gitignore

# Use platform environment variables
# Vercel: Dashboard -> Settings -> Environment Variables
# Railway: Dashboard -> Variables
# Render: Dashboard -> Environment
```

## 📊 Monitoring & Analytics

### 1. Backend Monitoring
```python
# Add to requirements.txt
sentry-sdk[fastapi]==1.32.0

# Add to server.py
import sentry_sdk
sentry_sdk.init(dsn="YOUR_SENTRY_DSN")
```

### 2. Frontend Analytics
```javascript
// Add Google Analytics
npm install gtag

// Add to src/index.js
import { gtag } from 'gtag'
gtag('config', 'GA_MEASUREMENT_ID')
```

## 🧪 Testing in Production

### 1. Health Checks
```bash
# Test backend health
curl https://api.your-domain.com/api/ring-builder/health

# Test frontend
curl https://your-domain.com
```

### 2. API Testing
```bash
# Test stone endpoint
curl https://api.your-domain.com/api/ring-builder/stones

# Test price calculation
curl -X POST https://api.your-domain.com/api/ring-builder/calculate-price \
  -H "Content-Type: application/json" \
  -d '{"stone_id":"stone-id","setting_id":"setting-id","metal_id":"metal-id","carat":1.0}'
```

## 🔄 CI/CD Pipeline (GitHub Actions)

### .github/workflows/deploy.yml
```yaml
name: Deploy Ring Builder

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && yarn install && yarn build
      
  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
```

## 🏁 Go-Live Checklist

### Pre-Launch
- [ ] Backend deployed and health check passes
- [ ] Frontend deployed and loads correctly
- [ ] Database connected and seeded with initial data
- [ ] Environment variables configured
- [ ] SSL certificates active
- [ ] Domain DNS configured

### Testing
- [ ] Personality quiz completes successfully
- [ ] Stone selection works with carat slider
- [ ] Price calculation returns correct values
- [ ] Configuration saving to database works
- [ ] Booking link redirects correctly
- [ ] Mobile responsiveness verified

### Post-Launch
- [ ] Monitor error logs for 24 hours
- [ ] Test performance under load
- [ ] Verify analytics tracking
- [ ] Set up monitoring alerts
- [ ] Create backup schedule

## 🚨 Troubleshooting

### Common Issues

#### "CORS Error"
```javascript
// Check backend CORS configuration
// Ensure frontend domain is in allow_origins list
```

#### "Database Connection Failed"
```python
# Check MongoDB Atlas IP whitelist
# Verify connection string format
# Test connection string manually
```

#### "API 404 Errors"
```bash
# Ensure backend routes include /api prefix
# Check if backend service is running
# Verify environment variable REACT_APP_BACKEND_URL
```

#### "Build Failures"
```bash
# Frontend: Check Node.js version compatibility
# Backend: Check Python version and requirements.txt
# Clear build cache and try again
```

### Performance Issues
- Enable gzip compression
- Implement image optimization
- Add database query indexes
- Use CDN for static assets

## 📞 Support

For deployment assistance:
- **Technical Issues**: Check logs in platform dashboards
- **Database Problems**: MongoDB Atlas support
- **DNS Issues**: Your domain registrar support

---

**Your Ring Builder is Ready for Production! 🚀**