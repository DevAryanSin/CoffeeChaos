# Netlify Deployment Guide for CoffeeChaos

## Overview
This guide will help you deploy your CoffeeChaos application to Netlify. The app consists of:
- **Frontend**: Next.js static export
- **Backend**: Express API running as Netlify Functions

## Prerequisites
- Netlify account
- GitHub repository with your code
- MongoDB Atlas connection string

## Step 1: Update Backend Environment Variables

In your `backend/.env` file, add your Netlify site URL:

```env
MONGODB_URI=mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/test?appName=Clusterv1
PORT=5000
FRONTEND_URL=https://your-actual-site-name.netlify.app
```

**Note**: You'll get your actual Netlify URL after the first deployment.

## Step 2: Configure Netlify Environment Variables

In your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

| Variable Name | Value |
|--------------|-------|
| `MONGODB_URI` | `mongodb+srv://psingharya05_db_user:w5EdXuHuIS32MC4m@clusterv1.g6glra4.mongodb.net/test?appName=Clusterv1` |
| `FRONTEND_URL` | `https://your-actual-site-name.netlify.app` |
| `NODE_VERSION` | `18` |

## Step 3: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. Log in to [Netlify](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect to your Git provider (GitHub, GitLab, etc.)
4. Select your `CoffeeChaos` repository
5. Configure build settings:
   - **Build command**: `cd backend && npm install && cd ../frontend && npm install && npm run build`
   - **Publish directory**: `frontend/out`
   - **Functions directory**: `backend/functions`
6. Click **Deploy site**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts and select:
# - Create & configure a new site
# - Choose your team
# - Enter a site name (or leave blank for random)
# - Build command: cd backend && npm install && cd ../frontend && npm install && npm run build
# - Publish directory: frontend/out
# - Functions directory: backend/functions

# Deploy
netlify deploy --prod
```

## Step 4: Update Frontend URL

After deployment, Netlify will give you a URL like `https://your-site-name.netlify.app`.

1. Update `backend/.env`:
   ```env
   FRONTEND_URL=https://your-actual-site-name.netlify.app
   ```

2. Update Netlify environment variables:
   - Go to **Site settings** → **Environment variables**
   - Update `FRONTEND_URL` to your actual Netlify URL

3. Redeploy the site:
   ```bash
   netlify deploy --prod
   ```
   Or trigger a redeploy from the Netlify dashboard.

## Step 5: Verify Deployment

1. Visit your Netlify URL
2. Open browser DevTools (F12) → Console
3. Check for any errors
4. Test the following:
   - Place an order
   - View leaderboard
   - Submit a rating

## Troubleshooting

### CORS Errors
If you see CORS errors:
1. Verify `FRONTEND_URL` in Netlify environment variables matches your site URL
2. Check that the backend CORS configuration includes `.netlify.app` domains
3. Redeploy after making changes

### API Not Found (404)
If API calls return 404:
1. Check that `netlify.toml` has the correct redirects
2. Verify functions are in `backend/functions` directory
3. Check Netlify Functions logs in dashboard

### MongoDB Connection Errors
If you see database errors:
1. Verify `MONGODB_URI` in Netlify environment variables
2. Check MongoDB Atlas network access allows connections from anywhere (0.0.0.0/0)
3. Verify database user credentials are correct

### Function Timeout
If functions timeout:
1. Check MongoDB Atlas is accessible
2. Verify network access settings in MongoDB Atlas
3. Check function logs in Netlify dashboard

## Local Development

For local development, you still need to run both servers:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The frontend will automatically use `http://localhost:5000/api` when running locally.

## Architecture

### How it Works

1. **Frontend**: Static Next.js site served from Netlify CDN
2. **API Calls**: Frontend makes requests to `/api/*`
3. **Netlify Redirects**: Requests to `/api/*` are redirected to `/.netlify/functions/api/*`
4. **Backend Functions**: Express app runs as serverless function
5. **Database**: MongoDB Atlas stores all data

### File Structure

```
CoffeeChaos/
├── backend/
│   ├── functions/
│   │   └── api.js          # Netlify function wrapper
│   ├── server.js           # Express app
│   ├── package.json
│   └── .env                # Backend environment variables
├── frontend/
│   ├── app/                # Next.js pages
│   ├── lib/
│   │   └── axios.js        # API client with smart URL detection
│   ├── package.json
│   └── .env.local          # Frontend environment variables
└── netlify.toml            # Netlify configuration
```

## Important Notes

1. **Environment Variables**: Never commit `.env` files to Git
2. **MongoDB Atlas**: Ensure network access allows Netlify (0.0.0.0/0 or specific IPs)
3. **Build Time**: First build may take 2-3 minutes
4. **Cold Starts**: Serverless functions may have cold start delays (~1-2 seconds)
5. **Logs**: Check Netlify Functions logs for backend errors

## Support

If you encounter issues:
1. Check Netlify deploy logs
2. Check Netlify Functions logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
