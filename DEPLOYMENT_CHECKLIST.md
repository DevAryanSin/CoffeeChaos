# 🚀 Netlify Deployment Checklist

## Pre-Deployment

- [ ] MongoDB Atlas cluster is running
- [ ] MongoDB connection string is ready
- [ ] All code is committed to Git repository
- [ ] Repository is pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` files are in `.gitignore` (not committed)

## Netlify Setup

- [ ] Create new site on Netlify
- [ ] Connect Git repository
- [ ] Verify `netlify.toml` is detected

## Environment Variables

Configure in Netlify Dashboard → Site settings → Environment variables:

- [ ] `MONGODB_URI` - Your MongoDB connection string
- [ ] `FRONTEND_URL` - Your Netlify site URL (e.g., `https://your-site.netlify.app`)
- [ ] `NODE_VERSION` - Set to `18`

## MongoDB Atlas Configuration

- [ ] Database user created with read/write permissions
- [ ] Network Access configured:
  - Option 1: Allow access from anywhere (`0.0.0.0/0`) - Recommended for Netlify
  - Option 2: Add Netlify IP ranges (more complex)
- [ ] Database name matches your connection string

## Deploy

- [ ] Click "Deploy site" in Netlify
- [ ] Wait for build to complete (check build logs)
- [ ] Verify no build errors

## Post-Deployment Testing

- [ ] Visit site URL - Frontend loads correctly
- [ ] Test API health: `https://your-site.netlify.app/api/health`
- [ ] Test placing an order
- [ ] Test viewing leaderboard
- [ ] Test submitting a rating
- [ ] Check Netlify function logs for MongoDB connection

## Verification

- [ ] All features working
- [ ] No console errors in browser
- [ ] MongoDB shows active connections
- [ ] Function logs show successful requests

## Optional Enhancements

- [ ] Set up custom domain
- [ ] Configure build hooks for auto-deployment
- [ ] Add database indexes for performance
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure CORS for specific origins (production security)

## Troubleshooting

If something doesn't work:

1. Check Netlify build logs
2. Check Netlify function logs
3. Verify environment variables are set correctly
4. Test MongoDB connection from MongoDB Atlas
5. Clear browser cache and try again
6. Review `DEPLOYMENT.md` for detailed troubleshooting

---

**Status**: 
- [ ] Deployed successfully
- [ ] All tests passing
- [ ] Ready for production

**Deployment Date**: _____________

**Site URL**: _____________

**Notes**: 
_____________________________________________________________
_____________________________________________________________
