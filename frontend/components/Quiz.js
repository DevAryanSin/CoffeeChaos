// components/Quiz.js
"use client";

import { useState } from "react";

import IngredientsPuzzle from "./quizzes/Ingredients";
import CoffeeTypeQuiz from "./quizzes/Type";

const QUIZZES = [IngredientsPuzzle, CoffeeTypeQuiz];

export default function Quiz({ onExit, onComplete, mode = 'training' }) {
    const [currentQuizIndex, setCurrentQuizIndex] = useState(
        mode === 'verification' ? 0 : Math.floor(Math.random() * QUIZZES.length)
    );
    const [verificationsPassed, setVerificationsPassed] = useState(0);

    const SelectedQuiz = QUIZZES[currentQuizIndex];

    const handleQuizComplete = (success) => {
        if (mode === 'training') {
            onComplete(success);
        } else if (mode === 'verification') {
            if (success) {
                const newPassCount = verificationsPassed + 1;
                setVerificationsPassed(newPassCount);

                if (newPassCount === QUIZZES.length) {
                    onComplete(true);
                } else {
                    setCurrentQuizIndex((newPassCount) % QUIZZES.length);
                }
            } else {
                onComplete(false);
            }
        }
    };

    return (
        <div
            className="w-full bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-lg border-4 border-coffee-600 shadow-2xl overflow-hidden"
            style={{
                padding: "24px",
            }}
        >
            {mode !== 'verification' && (
                <button
                    onClick={onExit}
                    className="absolute top-4 right-4 bg-coffee-700 hover:bg-coffee-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    ✕ Exit
                </button>
            )}

            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-coffee-900 mb-2">
                    Operation Coffee Chaos
                </h1>
                <p className="text-sm font-semibold text-coffee-700 bg-coffee-300 inline-block px-3 py-1 rounded-full">
                    {mode === 'verification' 
                        ? `Verification (${verificationsPassed + 1}/${QUIZZES.length})` 
                        : 'Training Mode'}
                </p>
            </div>

            <p className="text-center text-coffee-800 text-sm mb-6 italic">
                {mode === 'verification'
                    ? `Brewster needs to know if you're a true coffee lover. Solve ${QUIZZES.length} quizzes to enter the cafe! (Quiz ${verificationsPassed + 1}/${QUIZZES.length})`
                    : "Brewster is testing you. Solve this random coffee puzzle to prove your skills."}
            </p>

            {/* This renders one of the quiz components */}
            <div className="bg-white rounded-lg p-6 border-2 border-coffee-400">
                <SelectedQuiz onComplete={handleQuizComplete} />
            </div>
        </div>
    );
}
