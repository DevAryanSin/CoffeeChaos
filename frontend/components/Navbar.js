'use client';

export default function Navbar({ username, onUsernameChange }) {
    return (
        <nav className="bg-coffee-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">☕ Brewster Buster</h1>
                        <p className="text-sm text-coffee-200">
                            Simple Coffee Ordering App
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="username" className="text-sm">Your Name:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => onUsernameChange(e.target.value)}
                            placeholder="Enter your name"
                            className="px-3 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
