'use client';

import { useEffect, useState } from 'react';
import DashboardPage from './dashboard/page';
import Quiz from '@/components/Quiz';

export default function Home() {
    const [showQuiz, setShowQuiz] = useState(false);
    const [verificationFailed, setVerificationFailed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Check if user has already passed verification
        const isVerified = localStorage.getItem('coffeeLover');
        if (!isVerified) {
            setShowQuiz(true);
        }
        setIsLoaded(true);
    }, []);

    const handleQuizComplete = (success) => {
        if (success) {
            localStorage.setItem('coffeeLover', 'true');
            setShowQuiz(false);
        } else {
            setVerificationFailed(true);
            setShowQuiz(false);
        }
    };

    if (!isLoaded) {
        return null;
    }

    if (verificationFailed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-900 to-coffee-800 text-white">
                <div className="bg-gradient-to-br from-red-900 to-red-800 p-8 rounded-lg shadow-2xl text-center max-w-md border border-red-600">
                    <h1 className="text-4xl font-bold mb-4">🚫 Access Denied</h1>
                    <p className="text-lg mb-6 text-red-100">
                        Sorry, you are not a coffee lover. Brewster only allows true coffee enthusiasts in the dashboard.
                    </p>
                    <div className="text-sm text-red-200">
                        Please close this tab or try again later.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Dashboard with blur when quiz is showing */}
            <div className={`transition-all duration-300 ${showQuiz ? 'blur-sm' : ''}`}>
                <DashboardPage hideQuizButton={showQuiz} />
            </div>

            {/* Quiz Modal Overlay */}
            {showQuiz && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black/40 absolute inset-0"></div>
                    <div className="relative z-50 w-full max-w-md mx-4">
                        <Quiz
                            onExit={() => setShowQuiz(false)}
                            onComplete={handleQuizComplete}
                            mode="verification"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
