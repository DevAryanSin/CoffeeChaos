require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS configuration for both local and production
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, or same-origin)
        if (!origin) return callback(null, true);

        // Check if origin is in allowed list or is a Netlify deploy preview
        if (allowedOrigins.includes(origin) || origin.includes('.netlify.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// MongoDB Connection with serverless optimization
let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const options = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 1,  // Maintain at least 1 socket connection
        };

        await mongoose.connect(process.env.MONGODB_URI, options);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        isConnected = false;
        throw err;
    }
};

// MongoDB Connection Middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('Database connection failed:', err);
        return res.status(503).json({
            error: 'Database temporarily unavailable',
            message: 'Please try again in a moment'
        });
    }
});


const User = mongoose.model('User', {
    username: String,
    email: String,
    totalCups: { type: Number, default: 0 }
});

const Order = mongoose.model('Order', {
    username: String,
    coffeeType: String,
    sugar: String,
    size: String,
    createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', {
    username: String,
    orderId: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Running!' });
});

app.post('/api/orders', async (req, res) => {
    try {
        const { username, coffeeType, sugar, size } = req.body;

        const order = new Order({ username, coffeeType, sugar, size });
        await order.save();

        await User.findOneAndUpdate(
            { username },
            { $inc: { totalCups: 1 } },
            { upsert: true, new: true }
        );

        console.log(`Order placed: ${coffeeType} for ${username}`);
        res.json({ success: true, message: 'Order placed!', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/orders/:username', async (req, res) => {
    try {
        const orders = await Order.find({ username: req.params.username })
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const topUsers = await User.find()
            .sort({ totalCups: -1 })
            .limit(10);

        const leaderboard = topUsers.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            totalCups: user.totalCups
        }));

        res.json({ success: true, leaderboard });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/ratings', async (req, res) => {
    try {
        const { username, orderId, rating, comment } = req.body;

        const newRating = new Rating({ username, orderId, rating, comment });
        await newRating.save();

        res.json({ success: true, message: 'Rating submitted!', rating: newRating });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/ratings/:username', async (req, res) => {
    try {
        const ratings = await Rating.find({ username: req.params.username })
            .sort({ createdAt: -1 });
        res.json({ success: true, ratings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Coffee ready!`);
    });
}

module.exports = app;
