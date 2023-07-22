import { useState, useEffect } from "react";
import "./App.css";
import Dice from "./components/Dice";

function App() {
  // ** Initialize my app START
  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // You can use a more robust method for generating unique IDs
  };
  const initialDiceArray = Array.from({ length: 10 }, () => ({
    value: getRandomValue(1, 7), // Random value between 1 and 6 (inclusive)
    isHeld: false,
    id: generateUniqueId(),
  }));

  const [dice, setDice] = useState(initialDiceArray);

  // ** Initialize my app END

  // ** Dice Manipulation functions START
  function rollDice() {
    setDice((prevDice) => {
      const updatedDice = prevDice.map((die) => {
        if (!die.isHeld) {
          return {
            ...die,
            value: Math.floor(Math.random() * 6) + 1,
          };
        }
        return die; // If isHeld is true, keep the die object unchanged
      });

      return updatedDice;
    });
  }

  function hold(id) {
    setDice((prevDice) => {
      const newHeldDice = prevDice.map((die) => {
        if (id == die.id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          };
        } else {
          return die;
        }
      });
      return newHeldDice;
    });
  }

  // ** Dice Manipulation functions END

  const diceComponents = dice.map((dice, index) => {
    return (
      <Dice
        key={index}
        id={dice.id}
        value={dice.value}
        isHeld={dice.isHeld}
        hold={hold}
      />
    );
  });

  return (
    <div className="gameboard">
      <h1>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceComponents}</div>
      <button className="roll" onClick={rollDice}>
        Roll
      </button>
    </div>
  );
}

export default App;
