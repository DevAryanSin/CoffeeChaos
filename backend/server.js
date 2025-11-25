require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// MongoDB Connection Middleware
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            return res.status(500).json({ error: 'Database connection failed' });
        }
    }
    next();
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
