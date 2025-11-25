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
            setMessage("Correct!");
            if (onComplete) setTimeout(() => onComplete(true), 1500);
        } else {
            setMessage("That’s not a Latte.");
            if (onComplete) setTimeout(() => onComplete(false), 1500);
        }
    }

    function reset() {
        setSelected([]);
        setMessage("");
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-coffee-900 mb-2">
                Puzzle: Build the Latte
            </h2>
            <p className="text-sm text-coffee-700 mb-3">
                Select the correct ingredients to make a <span className="font-bold">Latte</span>.
            </p>

            <p className="text-sm font-semibold text-coffee-800 mb-4 bg-coffee-100 px-3 py-2 rounded">
                Selected: {selected.length > 0 ? selected.join(", ") : "None"}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {allIngredients.map((ingredient) => {
                    const isSelected = selected.includes(ingredient);
                    return (
                        <button
                            key={ingredient}
                            onClick={() => toggleIngredient(ingredient)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-150 ${
                                isSelected
                                    ? 'bg-coffee-600 text-white border-2 border-coffee-700 shadow-md'
                                    : 'bg-coffee-200 text-coffee-900 border-2 border-coffee-400 hover:bg-coffee-300'
                            }`}
                        >
                            {ingredient}
                        </button>
                    );
                })}
            </div>

            <div className="flex gap-3 mb-3">
                <button
                    onClick={checkAnswer}
                    className="flex-1 bg-coffee-700 hover:bg-coffee-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-150"
                >
                    Brew!
                </button>
                <button
                    onClick={reset}
                    className="bg-coffee-200 hover:bg-coffee-300 text-coffee-900 font-semibold py-2 px-4 rounded-lg border-2 border-coffee-400 transition-colors duration-150"
                >
                    Reset
                </button>
            </div>

            {message && (
                <p className="text-sm font-semibold text-coffee-900 text-center mt-3">
                    {message}
                </p>
            )}
        </div>
    );
}
