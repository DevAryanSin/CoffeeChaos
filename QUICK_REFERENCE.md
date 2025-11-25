# 🚀 Quick Deployment Reference

## ⚡ TL;DR - Deploy in 5 Minutes

### 1. MongoDB Atlas (2 min)
```
✓ Create cluster at mongodb.com/cloud/atlas
✓ Create database user
✓ Network Access → Allow 0.0.0.0/0
✓ Copy connection string
```

### 2. Netlify Setup (2 min)
```
✓ Go to netlify.com
✓ New site → Import from Git
✓ Select CoffeeChaos repository
✓ Auto-detects netlify.toml ✓
```

### 3. Environment Variables (1 min)
```
Site settings → Environment variables → Add:

MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/db
FRONTEND_URL = https://your-site.netlify.app
NODE_VERSION = 18
```

### 4. Deploy
```
✓ Click "Deploy site"
✓ Wait ~2 minutes
✓ Done! 🎉
```

---

## 🧪 Quick Test

```bash
# After deployment, test:
curl https://your-site.netlify.app/api/health

# Should return:
{"status":"OK","message":"Running!"}
```

---

## 📋 Environment Variables Cheatsheet

### Local Development (.env)
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/coffeechaos
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Netlify Production (Dashboard)
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/coffeechaos
FRONTEND_URL=https://your-site.netlify.app
NODE_VERSION=18
```

---

## 🔧 Common Commands

### Local Development
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

### Deployment
```bash
# Git push (auto-deploys)
git push origin main

# Or Netlify CLI
netlify deploy --prod
```

---

## 🐛 Quick Fixes

### Problem: MongoDB connection failed
```bash
✓ Check MONGODB_URI in Netlify
✓ MongoDB Atlas → Network Access → 0.0.0.0/0
✓ Verify database user password
```

### Problem: 404 on /api routes
```bash
✓ Verify netlify.toml exists
✓ Check backend/functions/api.js exists
✓ Redeploy site
```

### Problem: CORS errors
```bash
✓ Set FRONTEND_URL in Netlify
✓ Check backend/server.js CORS config
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `netlify.toml` | Netlify config |
| `backend/functions/api.js` | Serverless handler |
| `backend/server.js` | Express app |
| `frontend/lib/axios.js` | API client |

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster ready
- [ ] Connection string copied
- [ ] Network access: 0.0.0.0/0
- [ ] Netlify site created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Site deployed
- [ ] API health check passes
- [ ] Frontend loads
- [ ] All features tested

---

## 🎯 API Endpoints

```
GET  /api/health              → Health check
POST /api/orders              → Create order
GET  /api/orders/:username    → Get orders
GET  /api/leaderboard         → Top users
POST /api/ratings             → Submit rating
GET  /api/ratings/:username   → Get ratings
```

---

## 📚 Full Documentation

- **Quick Start**: README.md
- **Full Guide**: DEPLOYMENT.md
- **Checklist**: DEPLOYMENT_CHECKLIST.md
- **Architecture**: CONVERSION_SUMMARY.md

---

## 🆘 Need Help?

1. Check DEPLOYMENT.md troubleshooting section
2. Review Netlify function logs
3. Verify environment variables
4. Test MongoDB connection

---

**Status**: ✅ Ready to Deploy!
