// components/quizzes/CoffeeTypeQuiz.js
"use client";

import { useState } from "react";

export default function CoffeeTypeQuiz({ onComplete }) {
    const questions = [
        {
            text: "2 shots espresso + steamed milk + thin layer of foam.",
            answer: "Latte",
            options: ["Latte", "Cappuccino", "Americano", "Espresso"],
        },
        {
            text: "1 shot espresso + hot water.",
            answer: "Americano",
            options: ["Latte", "Americano", "Mocha", "Cappuccino"],
        },
    ];

    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState("");

    const current = questions[index];

    function handleClick(option) {
        if (option === current.answer) {
            setMessage("Correct!");
            if (onComplete) setTimeout(() => onComplete(true), 1500);
        } else {
            setMessage("Wrong answer!");
            if (onComplete) setTimeout(() => onComplete(false), 1500);
        }
    }

    function nextQuestion() {
        const nextIndex = (index + 1) % questions.length;
        setIndex(nextIndex);
        setMessage("");
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-coffee-900 mb-2">
                Quiz: Name That Coffee
            </h2>
            <p className="text-sm text-coffee-700 mb-4">
                Read the recipe and choose the correct coffee type.
            </p>

            <div className="bg-coffee-50 border-2 border-coffee-400 rounded-lg p-4 mb-4 text-coffee-900 font-medium">
                {current.text}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {current.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleClick(option)}
                        className="bg-coffee-600 hover:bg-coffee-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-150 text-sm"
                    >
                        {option}
                    </button>
                ))}
            </div>

            {message && (
                <p className="text-sm font-semibold text-coffee-900 mb-3 text-center">
                    {message}
                </p>
            )}

            <button
                onClick={nextQuestion}
                className="text-coffee-700 hover:text-coffee-900 font-semibold text-sm underline cursor-pointer transition-colors duration-150"
            >
                Next recipe →
            </button>
        </div>
    );
}
