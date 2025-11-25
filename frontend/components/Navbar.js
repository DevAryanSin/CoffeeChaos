'use client';

export default function Navbar({ username, onUsernameChange }) {
    return (
        <nav className="bg-coffee-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold">Coffee Chaos</h1>
                </div>
            </div>
        </nav>
    );
}
