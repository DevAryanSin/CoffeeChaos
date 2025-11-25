# CoffeeChaos - Netlify Deployment Guide

## 🚀 Deployment Overview

This project is configured for **Netlify** deployment with:
- **Frontend**: Next.js static export (SSG)
- **Backend**: Netlify Functions (serverless)
- **Database**: MongoDB Atlas

## 📋 Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **MongoDB Atlas**: Active cluster with connection string
3. **Git Repository**: Code pushed to GitHub/GitLab/Bitbucket

## 🔧 Deployment Steps

### 1. Connect Repository to Netlify

1. Log in to Netlify
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider and select the `CoffeeChaos` repository
4. Netlify will auto-detect the `netlify.toml` configuration

### 2. Configure Environment Variables

In Netlify Dashboard → **Site settings** → **Environment variables**, add:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/coffeechaos` |
| `FRONTEND_URL` | Your Netlify site URL | `https://your-site.netlify.app` |
| `NODE_VERSION` | Node.js version | `18` |

**Important**: 
- Do NOT include `PORT` variable (Netlify handles this automatically)
- The `MONGODB_URI` should be the full connection string from MongoDB Atlas

### 3. Deploy

1. Click **"Deploy site"**
2. Netlify will:
   - Install backend dependencies
   - Install frontend dependencies
   - Build the Next.js static site
   - Deploy serverless functions
   - Configure redirects

### 4. Verify Deployment

After deployment completes:

1. **Test API Health**:
   ```
   https://your-site.netlify.app/api/health
   ```
   Should return: `{"status":"OK","message":"Running!"}`

2. **Test Frontend**:
   Visit your site URL and verify the app loads

3. **Check Function Logs**:
   - Go to Netlify Dashboard → **Functions** → **api**
   - View logs to confirm MongoDB connection

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Netlify CDN                        │
│                                                     │
│  ┌──────────────────┐      ┌──────────────────┐   │
│  │  Static Frontend │      │ Serverless API   │   │
│  │   (Next.js SSG)  │◄────►│ (Functions/api)  │   │
│  │                  │      │                  │   │
│  │  /index.html     │      │  /api/*          │   │
│  │  /dashboard      │      │                  │   │
│  │  /leaderboard    │      │  Express Routes: │   │
│  │  /assets/*       │      │  - /api/orders   │   │
│  └──────────────────┘      │  - /api/ratings  │   │
│                            │  - /api/leaderboard│  │
│                            └──────────┬───────────┘│
└───────────────────────────────────────┼────────────┘
                                        │
                                        ▼
                            ┌─────────────────────┐
                            │   MongoDB Atlas     │
                            │   (Cloud Database)  │
                            │                     │
                            │  Collections:       │
                            │  - users            │
                            │  - orders           │
                            │  - ratings          │
                            └─────────────────────┘
```

## 📁 Project Structure

```
CoffeeChaos/
├── backend/
│   ├── functions/
│   │   └── api.js              # Netlify Function handler
│   ├── server.js               # Express app (serverless-ready)
│   ├── package.json
│   └── .env                    # Local dev only (not deployed)
├── frontend/
│   ├── app/                    # Next.js pages
│   ├── components/             # React components
│   ├── lib/
│   │   └── axios.js            # API client (auto-detects env)
│   ├── next.config.js          # Static export config
│   └── package.json
└── netlify.toml                # Netlify configuration
```

## 🔄 How It Works

### Request Flow

1. **Frontend Requests** (`/api/*`):
   - `axios.js` detects environment
   - Local: `http://localhost:5000/api`
   - Production: `/api` (relative path)

2. **Netlify Redirects**:
   - `/api/*` → `/.netlify/functions/api/*`
   - Configured in `netlify.toml`

3. **Serverless Function**:
   - `functions/api.js` wraps Express app
   - Handles all API routes
   - Caches MongoDB connection

4. **MongoDB Connection**:
   - Connection cached across invocations
   - Optimized for serverless cold starts
   - Auto-reconnects if needed

### Environment Detection

The frontend automatically detects the environment:

```javascript
// lib/axios.js
const getBaseURL = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }
    
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:5000/api';  // Local dev
    }
    
    return '/api';  // Production (Netlify)
};
```

## 🧪 Local Development

### Backend (Express Server)
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Testing Serverless Locally

Install Netlify CLI:
```bash
npm install -g netlify-cli
```

Run locally:
```bash
netlify dev
```

This simulates the Netlify environment locally.

## 🐛 Troubleshooting

### Issue: "Database connection failed"

**Solution**:
1. Verify `MONGODB_URI` in Netlify environment variables
2. Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
3. Verify database user credentials
4. Check function logs in Netlify dashboard

### Issue: "404 on API routes"

**Solution**:
1. Verify `netlify.toml` redirects are configured
2. Check that `backend/functions/api.js` exists
3. Redeploy the site
4. Clear browser cache

### Issue: "CORS errors"

**Solution**:
1. Update `FRONTEND_URL` environment variable
2. Verify CORS settings in `backend/server.js`
3. Check that `credentials: true` is set in axios

### Issue: "Function timeout"

**Solution**:
1. MongoDB connection might be slow
2. Check `serverSelectionTimeoutMS` in `server.js`
3. Verify MongoDB Atlas region (closer = faster)
4. Consider upgrading Netlify plan for longer timeouts

## 📊 Monitoring

### Function Logs
- Netlify Dashboard → **Functions** → **api** → **Function log**
- Shows all console.log output
- Displays errors and connection status

### Analytics
- Netlify Dashboard → **Analytics**
- Monitor function invocations
- Track bandwidth usage

### MongoDB Monitoring
- MongoDB Atlas → **Metrics**
- Monitor connection count
- Track query performance

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **MongoDB**: Use IP whitelist (or `0.0.0.0/0` for Netlify)
3. **CORS**: Configure specific origins in production
4. **Rate Limiting**: Consider adding rate limiting middleware
5. **Authentication**: Implement proper auth for production

## 🚀 Performance Optimization

### Frontend
- ✅ Static export (pre-rendered HTML)
- ✅ Image optimization disabled (for static export)
- ✅ CDN delivery via Netlify

### Backend
- ✅ MongoDB connection caching
- ✅ Optimized pool size for serverless
- ✅ Efficient query patterns

### Database
- Consider adding indexes:
  ```javascript
  // In MongoDB Atlas or via Mongoose
  User.index({ username: 1 });
  Order.index({ username: 1, createdAt: -1 });
  Rating.index({ username: 1, createdAt: -1 });
  ```

## 📝 Environment Variables Reference

### Required for Deployment

```bash
# Netlify Environment Variables
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://your-site.netlify.app
```

### Optional

```bash
# Override API URL (usually auto-detected)
NEXT_PUBLIC_API_URL=/api
```

## 🎯 Next Steps After Deployment

1. ✅ Test all features (orders, ratings, leaderboard)
2. ✅ Set up custom domain (optional)
3. ✅ Configure build hooks for auto-deployment
4. ✅ Set up monitoring/alerts
5. ✅ Add database indexes for performance
6. ✅ Implement proper authentication
7. ✅ Add error tracking (e.g., Sentry)

## 📚 Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [Serverless HTTP](https://github.com/dougmoscrop/serverless-http)

## 🆘 Support

If you encounter issues:
1. Check Netlify function logs
2. Verify environment variables
3. Test MongoDB connection
4. Review `netlify.toml` configuration
5. Check browser console for frontend errors

---

**Happy Deploying! ☕️**
