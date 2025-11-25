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
            setMessage("✅ Correct! You passed this caffeine check.");
            if (onComplete) setTimeout(() => onComplete(true), 1500);
        } else {
            setMessage("❌ Wrong answer. Brewster is not amused.");
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
            <h2 style={{ fontSize: "18px", marginBottom: "6px" }}>
                Quiz: Name That Coffee
            </h2>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "10px" }}>
                Read the recipe and choose the correct coffee type.
            </p>

            <div
                style={{
                    borderRadius: "10px",
                    border: "1px solid #4b5563",
                    padding: "10px",
                    marginBottom: "14px",
                    fontSize: "14px",
                }}
            >
                {current.text}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "10px",
                }}
            >
                {current.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleClick(option)}
                        style={{
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #6b7280",
                            background: "transparent",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px",
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {message && (
                <p
                    style={{
                        fontSize: "13px",
                        marginBottom: "8px",
                    }}
                >
                    {message}
                </p>
            )}

            <button
                onClick={nextQuestion}
                style={{
                    fontSize: "12px",
                    textDecoration: "underline",
                    background: "transparent",
                    border: "none",
                    color: "#9ca3af",
                    cursor: "pointer",
                }}
            >
                Next recipe →
            </button>
        </div>
    );
}
