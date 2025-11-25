# ☕ CoffeeChaos - Netlify Serverless Edition

A coffee ordering application built with **Next.js** (frontend) and **Express** (backend), optimized for **Netlify serverless deployment**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Netlify account (for deployment)

### Local Development

1. **Clone and Install**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Backend: Copy .env.example to .env
   cd backend
   cp .env.example .env
   # Edit .env and add your MongoDB connection string
   ```

3. **Run Development Servers**
   ```bash
   # Terminal 1: Backend (Express server)
   cd backend
   npm run dev
   # Runs on http://localhost:5000
   
   # Terminal 2: Frontend (Next.js)
   cd frontend
   npm run dev
   # Runs on http://localhost:3000
   ```

4. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/health

## 🌐 Deploy to Netlify

### Option 1: Git-based Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify auto-detects `netlify.toml` configuration

3. **Configure Environment Variables**
   
   In Netlify Dashboard → Site settings → Environment variables:
   
   | Variable | Value |
   |----------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `FRONTEND_URL` | Your Netlify site URL |
   | `NODE_VERSION` | `18` |

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Test your live site!

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📁 Project Structure

```
CoffeeChaos/
├── backend/
│   ├── functions/
│   │   └── api.js              # Netlify serverless function
│   ├── server.js               # Express app (serverless-ready)
│   ├── .env                    # Local environment variables
│   ├── .env.example            # Environment template
│   └── package.json
├── frontend/
│   ├── app/                    # Next.js pages
│   ├── components/             # React components
│   ├── lib/
│   │   └── axios.js            # API client (auto-detects env)
│   ├── next.config.js          # Next.js config (static export)
│   └── package.json
├── netlify.toml                # Netlify deployment config
├── DEPLOYMENT.md               # Detailed deployment guide
├── DEPLOYMENT_CHECKLIST.md     # Step-by-step checklist
└── CONVERSION_SUMMARY.md       # Architecture overview
```

## 🔧 Configuration Files

### `netlify.toml`
Configures Netlify build, functions, and redirects:
- Build command: Installs deps and builds frontend
- Publish directory: `frontend/out` (static export)
- Functions: `backend/functions`
- Redirects: `/api/*` → serverless functions

### `next.config.js`
Configures Next.js for static export:
- `output: 'export'` - Generates static HTML
- `images.unoptimized: true` - Required for static export

### `backend/functions/api.js`
Wraps Express app for Netlify Functions:
- Loads environment variables
- Uses `serverless-http` adapter
- Handles all `/api/*` routes

## 🗄️ Database

### MongoDB Atlas Setup

1. **Create Cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster

2. **Create Database User**
   - Database Access → Add New Database User
   - Set username and password
   - Grant read/write permissions

3. **Configure Network Access**
   - Network Access → Add IP Address
   - For Netlify: Allow access from anywhere (`0.0.0.0/0`)

4. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database password

### Collections
The app automatically creates these collections:
- `users` - User profiles and total cups
- `orders` - Coffee orders
- `ratings` - Order ratings

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:username` | Get user's orders |
| GET | `/api/leaderboard` | Get top 10 users by cups |
| POST | `/api/ratings` | Submit order rating |
| GET | `/api/ratings/:username` | Get user's ratings |

## 🎨 Features

- ☕ **Coffee Ordering**: Order different types of coffee
- 📊 **Leaderboard**: See top coffee drinkers
- ⭐ **Ratings**: Rate your coffee orders
- 🎯 **Quiz**: Coffee lover verification quiz
- 📱 **Responsive**: Works on all devices
- 🚀 **Serverless**: Scales automatically

## 🔐 Environment Variables

### Backend (`.env`)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000                           # Local dev only
FRONTEND_URL=http://localhost:3000  # Local dev
```

### Netlify (Dashboard)
```bash
MONGODB_URI=mongodb+srv://...       # Production database
FRONTEND_URL=https://your-site.netlify.app
NODE_VERSION=18
```

## 🧪 Testing

### Local Testing
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test frontend
# Open http://localhost:3000 in browser
```

### Production Testing
```bash
# Test API
curl https://your-site.netlify.app/api/health

# Expected response:
# {"status":"OK","message":"Running!"}
```

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide with troubleshooting
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment checklist
- **[CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)** - Architecture and conversion details

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access allows `0.0.0.0/0`
- Verify database user credentials

### 404 on API Routes
- Check `netlify.toml` redirects
- Verify `backend/functions/api.js` exists
- Redeploy the site

### CORS Errors
- Update `FRONTEND_URL` environment variable
- Check CORS settings in `backend/server.js`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting.

## 🚀 Performance

### Frontend
- ✅ Static HTML (pre-rendered)
- ✅ CDN delivery via Netlify
- ✅ Optimized assets

### Backend
- ✅ Serverless functions (auto-scaling)
- ✅ MongoDB connection caching
- ✅ Optimized pool size

### Database
- ✅ MongoDB Atlas (managed)
- ✅ Automatic backups
- ✅ Global clusters

## 📈 Monitoring

### Netlify
- Dashboard → Functions → View logs
- Dashboard → Analytics → Usage stats

### MongoDB Atlas
- Metrics → Monitor connections
- Performance Advisor → Query optimization

## 🔒 Security

- ✅ Environment variables (not in code)
- ✅ CORS configuration
- ✅ MongoDB authentication
- ✅ Network access controls

## 🎯 Next Steps

1. ✅ Deploy to Netlify
2. ✅ Test all features
3. ✅ Set up custom domain (optional)
4. ✅ Add database indexes for performance
5. ✅ Implement authentication (if needed)
6. ✅ Set up monitoring/alerts

## 📄 License

ISC

## 🤝 Contributing

Feel free to submit issues and pull requests!

---

**Built with ❤️ and ☕**

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
