'use client';

import { useState } from 'react';
import axiosInstance from '@/lib/axios';

const COFFEE_TYPES = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha', 'Cold Brew', 'Flat White'];
const SUGAR_OPTIONS = ['None', 'Light', 'Medium', 'Extra'];
const SIZE_OPTIONS = ['Small', 'Medium', 'Large'];

export default function OrderForm({ username, onOrderPlaced }) {
    const [formData, setFormData] = useState({
        coffeeType: 'Latte',
        sugar: 'Medium',
        size: 'Medium',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            setMessage('❌ Please enter your name first!');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axiosInstance.post('/orders', {
                username,
                ...formData
            });

            if (response.data.success) {
                setMessage('✅ Order placed successfully!');
                // Reset form
                setFormData({
                    coffeeType: 'Latte',
                    sugar: 'Medium',
                    size: 'Medium',
                });
                // Notify parent to refresh orders
                if (onOrderPlaced) onOrderPlaced();
            }
        } catch (error) {
            setMessage('❌ Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-coffee-900 mb-4">Place New Order</h2>

            {message && (
                <div className={`px-4 py-3 rounded mb-4 ${message.includes('✅')
                        ? 'bg-green-100 border border-green-400 text-green-700'
                        : 'bg-red-100 border border-red-400 text-red-700'
                    }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="coffeeType" className="block text-sm font-medium text-gray-700 mb-1">
                        Coffee Type
                    </label>
                    <select
                        id="coffeeType"
                        name="coffeeType"
                        value={formData.coffeeType}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {COFFEE_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sugar" className="block text-sm font-medium text-gray-700 mb-1">
                        Sugar
                    </label>
                    <select
                        id="sugar"
                        name="sugar"
                        value={formData.sugar}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {SUGAR_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                        Size
                    </label>
                    <select
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || !username}
                    className="btn-primary w-full disabled:opacity-50"
                >
                    {loading ? 'Placing Order...' : '☕ Place Order'}
                </button>
            </form>
        </div>
    );
}
