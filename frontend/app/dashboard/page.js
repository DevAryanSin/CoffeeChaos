'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import Navbar from '@/components/Navbar';
import OrderForm from '@/components/OrderForm';
import OrdersList from '@/components/OrdersList';
import Leaderboard from '@/components/Leaderboard';
import RatingsSection from '@/components/RatingsSection';
import Quiz from '@/components/Quiz';

export default function DashboardPage() {
    const [username, setUsername] = useState('');
    const [orders, setOrders] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizMode, setQuizMode] = useState('training'); // 'training' or 'verification'
    const [verificationFailed, setVerificationFailed] = useState(false);

    useEffect(() => {
        const isVerified = localStorage.getItem('coffeeLover');
        if (!isVerified) {
            setQuizMode('verification');
            setShowQuiz(true);
        }
        loadLeaderboard();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (username) {
            loadUserData();
        }
    }, [username]);

    const loadUserData = async () => {
        if (!username) return;

        try {
            const [ordersRes, ratingsRes] = await Promise.all([
                axiosInstance.get(`/orders/${username}`),
                axiosInstance.get(`/ratings/${username}`),
            ]);

            if (ordersRes.data.success) setOrders(ordersRes.data.orders);
            if (ratingsRes.data.success) setRatings(ratingsRes.data.ratings);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const loadLeaderboard = async () => {
        try {
            const response = await axiosInstance.get('/leaderboard');
            if (response.data.success) setLeaderboard(response.data.leaderboard);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        }
    };

    const handleOrderPlaced = () => {
        loadUserData();
        loadLeaderboard();
    };

    const handleRatingSubmitted = () => {
        loadUserData();
    };

    const handleQuizComplete = (success) => {
        if (quizMode === 'verification') {
            if (success) {
                localStorage.setItem('coffeeLover', 'true');
                setShowQuiz(false);
            } else {
                setVerificationFailed(true);
                setShowQuiz(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-coffee-700">Loading...</div>
            </div>
        );
    }

    if (verificationFailed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="bg-red-900 p-8 rounded-lg shadow-2xl text-center max-w-md border border-red-700">
                    <h1 className="text-3xl font-bold mb-4">🚫 Access Denied</h1>
                    <p className="text-lg mb-6">
                        Sorry, you cannot proceed. Brewster only allows true coffee lovers in the dashboard.
                    </p>
                    <div className="text-sm text-red-300">
                        Please close this tab or try again later.
                    </div>
                </div>
            </div>
        );
    }

    if (showQuiz) {
        return (
            <Quiz
                onExit={() => setShowQuiz(false)}
                onComplete={handleQuizComplete}
                mode={quizMode}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
            <Navbar username={username} onUsernameChange={setUsername} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => {
                            setQuizMode('training');
                            setShowQuiz(true);
                        }}
                        className="bg-coffee-600 text-white px-4 py-2 rounded shadow hover:bg-coffee-700 transition-colors"
                    >
                        🎯 Start Training
                    </button>
                </div>

                {!username && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6 text-center">
                        👆 Please enter your name in the navbar to start ordering!
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <OrderForm username={username} onOrderPlaced={handleOrderPlaced} />
                        <OrdersList orders={orders} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <Leaderboard leaderboard={leaderboard} />
                        <RatingsSection
                            username={username}
                            orders={orders}
                            ratings={ratings}
                            onRatingSubmitted={handleRatingSubmitted}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
