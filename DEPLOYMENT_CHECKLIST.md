# Quick Netlify Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] MongoDB Atlas network access allows 0.0.0.0/0
- [ ] All code is committed to Git repository
- [ ] Repository is pushed to GitHub/GitLab

## 🚀 Deployment Steps

### 1. Deploy to Netlify
```bash
# Option 1: Via Netlify Dashboard
# - Go to https://app.netlify.com
# - Click "Add new site" → "Import an existing project"
# - Connect your Git repository
# - Use these settings:
#   Build command: cd backend && npm install && cd ../frontend && npm install && npm run build
#   Publish directory: frontend/out
#   Functions directory: backend/functions

# Option 2: Via Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 2. Set Environment Variables in Netlify
Go to **Site settings** → **Environment variables** and add:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `FRONTEND_URL` | Your Netlify URL (e.g., https://your-site.netlify.app) |
| `NODE_VERSION` | `18` |

### 3. Update Backend .env
After getting your Netlify URL, update `backend/.env`:
```env
FRONTEND_URL=https://your-actual-site.netlify.app
```

### 4. Redeploy
Trigger a new deployment to apply the FRONTEND_URL change.

## 🧪 Testing

After deployment, test:
- [ ] Homepage loads
- [ ] Can place an order
- [ ] Leaderboard shows data
- [ ] Can submit ratings
- [ ] No CORS errors in browser console

## 🐛 Common Issues

### CORS Errors
- ✅ Verify `FRONTEND_URL` in Netlify matches your site URL
- ✅ Redeploy after changing environment variables

### 404 on API Calls
- ✅ Check `netlify.toml` redirects are correct
- ✅ Verify functions are in `backend/functions/`

### MongoDB Connection Fails
- ✅ Check `MONGODB_URI` in Netlify environment variables
- ✅ Verify MongoDB Atlas network access allows 0.0.0.0/0

## 📝 Important Files

- `netlify.toml` - Netlify configuration
- `backend/functions/api.js` - Serverless function wrapper
- `frontend/lib/axios.js` - Smart API client (auto-detects environment)
- `backend/server.js` - Express app with CORS configuration

## 🔗 Useful Links

- [Netlify Dashboard](https://app.netlify.com)
- [MongoDB Atlas](https://cloud.mongodb.com)
- [Full Deployment Guide](./DEPLOYMENT.md)
