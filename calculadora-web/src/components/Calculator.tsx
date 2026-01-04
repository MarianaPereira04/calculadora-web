"use client";

import { useState } from "react";


export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [firstValue, setFirstValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecond, setWaitingForSecond] = useState(false);

    const handleNumberClick = (value: string) => {
        if (waitingForSecond) {
            setDisplay(value);
            setWaitingForSecond(false);
        } else {
            setDisplay(display === "0" ? value : display + value);
        }
    };

    const handleOperatorClick = (op: string) => {
        setFirstValue(Number(display));
        setOperator(op);
        setWaitingForSecond(true);
    };

    const calculateResult = () => {
        if (firstValue === null || operator === null) return;

        const secondValue = Number(display);
        let result = 0;

        switch (operator) {
            case "+":
                result = firstValue + secondValue;
                break;
            case "-":
                result = firstValue - secondValue;
                break;
            case "×":
                result = firstValue * secondValue;
                break;
            case "÷":
                if (secondValue === 0) {
                    setDisplay("Error");
                    return;
                }
                result = firstValue / secondValue;
                break;
        }

        setDisplay(String(result));
        setFirstValue(null);
        setOperator(null);
    };

    const clearCalculator = () => {
        setDisplay("0");
        setFirstValue(null);
        setOperator(null);
        setWaitingForSecond(false);
    };

    return (
        <div className="calculator">
            <div className="display">{display}</div>

            <div className="buttons">
                <button onClick={() => handleNumberClick("7")}>7</button>
                <button onClick={() => handleNumberClick("8")}>8</button>
                <button onClick={() => handleNumberClick("9")}>9</button>
                <button onClick={() => handleOperatorClick("÷")}>÷</button>


                <button onClick={() => handleNumberClick("4")}>4</button>
                <button onClick={() => handleNumberClick("5")}>5</button>
                <button onClick={() => handleNumberClick("6")}>6</button>
                <button onClick={() => handleOperatorClick("×")}>×</button>


                <button onClick={() => handleNumberClick("1")}>1</button>
                <button onClick={() => handleNumberClick("2")}>2</button>
                <button onClick={() => handleNumberClick("3")}>3</button>
                <button onClick={() => handleOperatorClick("-")}>-</button>

                <button onClick={() => handleNumberClick("0")}>0</button>
                <button onClick={clearCalculator}>C</button>
                <button onClick={calculateResult}>=</button>
                <button onClick={() => handleOperatorClick("+")}>+</button>
            </div>
        </div>
    );
}
