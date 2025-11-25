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
    origin: true, // Allow all origins (adjust as needed for production)
    credentials: true // Enable credentials such as cookies
}));
app.use(express.json());

// MongoDB Connection - Optimized for Serverless
// Cache the connection to reuse across function invocations
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        console.log('✅ Using cached MongoDB connection');
        return cachedDb;
    }

    // Validate MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
        const error = new Error('MONGODB_URI environment variable is not set');
        console.error('❌ Configuration Error:', error.message);
        console.error('Available env vars:', Object.keys(process.env).filter(k => !k.includes('SECRET')));
        throw error;
    }

    try {
        console.log('🔄 Connecting to MongoDB...');
        console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
        console.log('MongoDB URI starts with:', process.env.MONGODB_URI.substring(0, 20) + '...');

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Increased timeout for Netlify
            // Optimize for serverless
            maxPoolSize: 10,
            minPoolSize: 1,
        });
        cachedDb = mongoose.connection;
        console.log('✅ Connected to MongoDB successfully');
        return cachedDb;
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('Error details:', {
            name: err.name,
            code: err.code,
            codeName: err.codeName
        });
        throw err;
    }
}



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
        await connectToDatabase();

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
        await connectToDatabase();

        const orders = await Order.find({ username: req.params.username })
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        await connectToDatabase();

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
        await connectToDatabase();

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
        await connectToDatabase();

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
