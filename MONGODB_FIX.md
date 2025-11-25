# 🔧 MongoDB Connection Fix - Netlify Deployment

## ❌ Error: "Request failed with status code 500"

This error occurs when the MongoDB connection fails in Netlify Functions.

---

## ✅ Solution Checklist

### 1. **Set Environment Variables in Netlify Dashboard**

**CRITICAL**: The `.env` file is NOT deployed to Netlify. You MUST set environment variables in the Netlify dashboard.

#### Steps:
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add these variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `MONGODB_URI` | Your full MongoDB connection string | `mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority` |
| `FRONTEND_URL` | Your Netlify site URL | `https://chaoscoffee.netlify.app` |
| `NODE_VERSION` | `18` | `18` |

**Important**: 
- Use the FULL connection string from MongoDB Atlas
- Include the database name in the URI
- Include `?retryWrites=true&w=majority` at the end

#### Your MongoDB URI should look like:
```
mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/coffeechaos?retryWrites=true&w=majority
```

**NOT** just:
```
mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/
```

---

### 2. **Configure MongoDB Atlas Network Access**

MongoDB Atlas blocks connections by default. You need to allow Netlify to connect.

#### Steps:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Select your cluster
3. Click **Network Access** (left sidebar)
4. Click **Add IP Address**
5. Select **Allow Access from Anywhere** (`0.0.0.0/0`)
6. Click **Confirm**

**Why?** Netlify Functions run on dynamic IPs, so you need to allow all IPs.

---

### 3. **Verify Database Name**

Your current connection string uses database name `test`. You should use a specific database name.

#### Update your MongoDB URI:
```bash
# Current (uses 'test' database)
mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/test?appName=Clusterv1

# Recommended (uses 'coffeechaos' database)
mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/coffeechaos?retryWrites=true&w=majority
```

---

### 4. **Redeploy After Setting Environment Variables**

After adding environment variables, you MUST redeploy:

#### Option 1: Trigger Deploy in Netlify
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

#### Option 2: Git Push
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## 🔍 Debugging Steps

### Check Netlify Function Logs

1. Go to Netlify Dashboard → **Functions**
2. Click on **api** function
3. Click **Function log**
4. Look for these messages:

#### ✅ Success:
```
🔄 Connecting to MongoDB...
MongoDB URI exists: true
MongoDB URI starts with: mongodb+srv://psing...
✅ Connected to MongoDB successfully
```

#### ❌ Error - Missing Environment Variable:
```
❌ Configuration Error: MONGODB_URI environment variable is not set
Available env vars: [...]
```
**Fix**: Add `MONGODB_URI` in Netlify environment variables

#### ❌ Error - Network Access:
```
❌ MongoDB connection error: connect ETIMEDOUT
Error details: { name: 'MongoServerError', code: ... }
```
**Fix**: Allow `0.0.0.0/0` in MongoDB Atlas Network Access

#### ❌ Error - Authentication:
```
❌ MongoDB connection error: Authentication failed
```
**Fix**: Verify username/password in connection string

---

## 📋 Complete Setup Guide

### Step 1: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Clusters** → **Connect**
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<database>` with `coffeechaos` (or your preferred name)

Example:
```
mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/coffeechaos?retryWrites=true&w=majority
```

### Step 2: Set in Netlify

1. Netlify Dashboard → Site settings → Environment variables
2. Add `MONGODB_URI` with the full connection string above
3. Add `FRONTEND_URL` with your Netlify URL (e.g., `https://chaoscoffee.netlify.app`)
4. Add `NODE_VERSION` = `18`

### Step 3: Configure MongoDB Atlas

1. MongoDB Atlas → Network Access
2. Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)

### Step 4: Redeploy

1. Netlify → Deploys → Trigger deploy → Clear cache and deploy site

### Step 5: Test

```bash
# Test API health
curl https://chaoscoffee.netlify.app/api/health

# Should return:
{"status":"OK","message":"Running!"}
```

---

## 🎯 Quick Fix Commands

### Update Local .env (for reference)
```bash
# backend/.env
MONGODB_URI=mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/coffeechaos?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Redeploy to Netlify
```bash
git add .
git commit -m "Fix MongoDB connection for Netlify"
git push origin main
```

---

## 🔐 Security Note

**Never commit `.env` files to Git!**

Your `.env` file should be in `.gitignore`:
```
# .gitignore
.env
.env.local
```

Environment variables should ONLY be set in:
- **Local development**: `.env` file (not committed)
- **Netlify production**: Netlify Dashboard environment variables

---

## ✅ Verification

After following these steps, verify:

1. ✅ Environment variables set in Netlify Dashboard
2. ✅ MongoDB Atlas allows `0.0.0.0/0` network access
3. ✅ Site redeployed
4. ✅ Function logs show successful MongoDB connection
5. ✅ API health check returns 200 OK
6. ✅ Frontend loads without errors

---

## 🆘 Still Not Working?

### Check Function Logs
```
Netlify Dashboard → Functions → api → Function log
```

Look for the specific error message and match it to the debugging steps above.

### Common Issues

| Error | Cause | Fix |
|-------|-------|-----|
| "MONGODB_URI not set" | Env var missing | Add in Netlify Dashboard |
| "ETIMEDOUT" | Network blocked | Allow 0.0.0.0/0 in Atlas |
| "Authentication failed" | Wrong password | Check connection string |
| "Database not found" | Wrong DB name | Update connection string |

---

## 📞 Need More Help?

1. Check Netlify function logs for specific error
2. Verify MongoDB Atlas connection string
3. Test connection string locally first
4. Ensure all environment variables are set
5. Redeploy after making changes

---

**After fixing, your site should work perfectly!** ✨
