# Brewster Buster ☕

A **simple** full-stack coffee ordering web application - perfect for beginners learning web development!

## Features

- ☕ Order coffee with custom options (type, sugar, size)
- 📊 Leaderboard showing top coffee lovers
- ⭐ Rate your previous orders
- 📱 Clean, responsive design

## Tech Stack

**Backend** (Simple!)
- Node.js + Express (web server)
- MongoDB + Mongoose (database)
- Just 4 dependencies!

**Frontend**
- Next.js 14 (React framework)
- Tailwind CSS (styling)
- Axios (API calls)

## Quick Start

### 1. Install MongoDB

Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)

Or use MongoDB Atlas (free cloud database)

### 2. Setup Backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### 4. Use the App!

1. Open `http://localhost:3000`
2. Enter your name in the navbar
3. Place coffee orders
4. Check the leaderboard
5. Rate your orders

## How It Works

### Backend (`backend/server.js`)

Everything is in **one file** - easy to understand!

- **Models**: User, Order, Rating (defined inline)
- **Routes**: 
  - `POST /api/orders` - Place an order
  - `GET /api/orders/:username` - Get user's orders
  - `GET /api/leaderboard` - Top users
  - `POST /api/ratings` - Submit rating
  - `GET /api/ratings/:username` - Get user's ratings

### Frontend

- **Dashboard** - Main page with all features
- **Components** - OrderForm, OrdersList, Leaderboard, RatingsSection
- **No authentication** - Just enter your name!

## Project Structure

```
CoffeeChaos/
├── backend/
│   ├── server.js          # Everything in one file!
│   ├── package.json       # Dependencies
│   └── .env              # MongoDB connection
└── frontend/
    ├── app/
    │   ├── dashboard/page.js  # Main page
    │   ├── page.js           # Landing page
    │   └── layout.js         # Layout
    ├── components/
    │   ├── Navbar.js
    │   ├── OrderForm.js
    │   ├── OrdersList.js
    │   ├── Leaderboard.js
    │   └── RatingsSection.js
    └── lib/
        └── axios.js          # API client
```

## Database Models

**User**
- username
- email  
- totalCups (auto-incremented)

**Order**
- username
- coffeeType
- sugar
- size
- createdAt

**Rating**
- username
- orderId
- rating (1-5)
- comment
- createdAt

## Configuration

**Backend** (`.env` file):
```
MONGODB_URI=mongodb://localhost:27017/brewster-buster
PORT=5000
```

**Frontend** (`.env.local` file):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Learning Resources

This project is great for learning:
- REST API design
- MongoDB/Mongoose basics
- Express.js routing
- React hooks (useState, useEffect)
- Next.js App Router
- Axios for API calls
- Tailwind CSS styling

## No Complex Stuff!

✅ No authentication/passwords  
✅ No JWT tokens  
✅ No sessions  
✅ No validation libraries  
✅ Everything in simple, readable code  

Perfect for beginners! 🎓

## Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`

**Frontend can't reach backend?**
- Make sure backend is running on port 5000
- Check CORS is enabled

**Orders not showing?**
- Enter your name in the navbar first!

## License

ISC - Free to use and learn from!
