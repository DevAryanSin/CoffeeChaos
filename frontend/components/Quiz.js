// components/Quiz.js
"use client";

import { useState } from "react";

// Import each quiz/puzzle component
import IngredientsPuzzle from "./quizzes/Ingredients";
import CoffeeTypeQuiz from "./quizzes/Type";

const QUIZZES = [IngredientsPuzzle, CoffeeTypeQuiz];

export default function Quiz({ onExit, onComplete, mode = 'training' }) {
    // Pick a random quiz ONLY once (on first render)
    const [index] = useState(() => {
        const randomIndex = Math.floor(Math.random() * QUIZZES.length);
        return randomIndex;
    });

    const SelectedQuiz = QUIZZES[index];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#111827",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui, sans-serif",
                position: "relative",
            }}
        >
            {mode !== 'verification' && (
                <button
                    onClick={onExit}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        padding: "8px 16px",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Exit Training
                </button>
            )}

            <div
                style={{
                    width: "100%",
                    maxWidth: "460px",
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid #4b5563",
                    background: "#020617",
                }}
            >
                <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
                    Operation Caffeine Chaos – {mode === 'verification' ? 'Verification' : 'Training'}
                </h1>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#9ca3af",
                        marginBottom: "12px",
                    }}
                >
                    {mode === 'verification'
                        ? "Brewster needs to know if you're a true coffee lover. Solve this puzzle to enter."
                        : "Brewster is testing you. Solve this random coffee puzzle to prove your skills."}
                </p>

                {/* This renders one of the quiz components */}
                <SelectedQuiz onComplete={onComplete} />
            </div>
        </div>
    );
}
