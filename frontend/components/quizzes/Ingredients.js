// components/quizzes/IngredientsPuzzle.js
"use client";

import { useState } from "react";

export default function IngredientsPuzzle({ onComplete }) {
    const [selected, setSelected] = useState([]);
    const [message, setMessage] = useState("");

    const allIngredients = ["Espresso", "Milk", "Sugar", "Foam", "Ice"];
    const correctRecipe = ["Espresso", "Milk"]; // Latte

    function toggleIngredient(ingredient) {
        if (selected.includes(ingredient)) {
            setSelected(selected.filter((item) => item !== ingredient));
        } else {
            setSelected([...selected, ingredient]);
        }
        setMessage("");
    }

    function checkAnswer() {
        const sortedSelected = [...selected].sort();
        const sortedCorrect = [...correctRecipe].sort();

        const isSameLength = sortedSelected.length === sortedCorrect.length;
        const isSame =
            isSameLength &&
            sortedSelected.every((value, index) => value === sortedCorrect[index]);

        if (isSame) {
            setMessage("✅ Correct! You brewed a Latte and calmed Brewster down.");
            if (onComplete) setTimeout(() => onComplete(true), 1500);
        } else {
            setMessage("❌ That’s not a Latte. The city is still in danger!");
            if (onComplete) setTimeout(() => onComplete(false), 1500);
        }
    }

    function reset() {
        setSelected([]);
        setMessage("");
    }

    return (
        <div>
            <h2 style={{ fontSize: "18px", marginBottom: "6px" }}>
                Puzzle: Build the Latte
            </h2>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "10px" }}>
                Select the correct ingredients to make a <b>Latte</b>.
            </p>

            <p style={{ fontSize: "13px", marginBottom: "8px" }}>
                Selected: {selected.join(", ") || "None"}
            </p>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "14px",
                }}
            >
                {allIngredients.map((ingredient) => {
                    const isSelected = selected.includes(ingredient);
                    return (
                        <button
                            key={ingredient}
                            onClick={() => toggleIngredient(ingredient)}
                            style={{
                                padding: "6px 10px",
                                borderRadius: "999px",
                                border: "1px solid #6b7280",
                                background: isSelected ? "#22c55e" : "transparent",
                                color: isSelected ? "black" : "white",
                                cursor: "pointer",
                                fontSize: "13px",
                            }}
                        >
                            {ingredient}
                        </button>
                    );
                })}
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <button
                    onClick={checkAnswer}
                    style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#22c55e",
                        color: "black",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                    }}
                >
                    Brew!
                </button>
                <button
                    onClick={reset}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #6b7280",
                        background: "transparent",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "13px",
                    }}
                >
                    Reset
                </button>
            </div>

            {message && (
                <p
                    style={{
                        fontSize: "13px",
                        marginTop: "4px",
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
