'use client';

import { useState } from 'react';
import axiosInstance from '@/lib/axios';

export default function RatingsSection({ username, orders, ratings, onRatingSubmitted }) {
    const [selectedOrder, setSelectedOrder] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Filter out orders that have already been rated
    const ratedOrderIds = ratings?.map(r => r.orderId) || [];
    const unratedOrders = orders?.filter(o => !ratedOrderIds.includes(o._id)) || [];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            setMessage('❌ Please enter your name first');
            return;
        }

        if (!selectedOrder) {
            setMessage('❌ Please select an order to rate');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axiosInstance.post('/ratings', {
                username,
                orderId: selectedOrder,
                rating: parseInt(rating),
                comment,
            });

            if (response.data.success) {
                setMessage('✅ Rating submitted successfully!');
                setSelectedOrder('');
                setRating(5);
                setComment('');
                if (onRatingSubmitted) onRatingSubmitted();
            }
        } catch (error) {
            setMessage(error.response?.data?.message || '❌ Failed to submit rating');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-coffee-900 mb-4">⭐ Rate Your Orders</h2>

            {message && (
                <div className={`px-4 py-3 rounded mb-4 ${message.includes('✅')
                        ? 'bg-green-100 border border-green-400 text-green-700'
                        : 'bg-red-100 border border-red-400 text-red-700'
                    }`}>
                    {message}
                </div>
            )}

            {unratedOrders.length > 0 ? (
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Order
                        </label>
                        <select
                            id="order"
                            value={selectedOrder}
                            onChange={(e) => setSelectedOrder(e.target.value)}
                            className="input-field"
                            required
                        >
                            <option value="">-- Choose an order --</option>
                            {unratedOrders.map((order) => (
                                <option key={order._id} value={order._id}>
                                    {order.coffeeType} ({order.size}, {order.sugar} sugar) - {new Date(order.createdAt).toLocaleDateString()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                            Rating: {rating} ⭐
                        </label>
                        <input
                            type="range"
                            id="rating"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Comment (optional)
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="input-field"
                            rows="3"
                            placeholder="Share your thoughts about this order..."
                            maxLength={500}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !username}
                        className="btn-primary w-full disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Rating'}
                    </button>
                </form>
            ) : (
                <p className="text-gray-600 mb-6">All your orders have been rated!</p>
            )}

            {/* Display existing ratings */}
            {ratings && ratings.length > 0 && (
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg text-coffee-800 mb-3">Your Ratings</h3>
                    <div className="space-y-3">
                        {ratings.map((ratingItem) => (
                            <div key={ratingItem._id} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium text-coffee-800">Order ID: {ratingItem.orderId}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(ratingItem.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-yellow-500 font-bold">
                                        {'⭐'.repeat(ratingItem.rating)}
                                    </div>
                                </div>
                                {ratingItem.comment && (
                                    <p className="text-sm text-gray-700 italic">"{ratingItem.comment}"</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
