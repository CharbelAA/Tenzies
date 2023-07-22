import { useEffect, useState } from "react";
import Confetti from "react-confetti";
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
  const [gameIsActive, setGameIsActive] = useState(true);

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

  function resetGame() {
    setDice(initialDiceArray);
    setGameIsActive(true);
  }

  // ** Dice Manipulation functions END

  useEffect(() => {
    function checkWin() {
      const heldDice = dice.filter((die) => die.isHeld);
      const heldDiceValues = heldDice.map((die) => die.value);
      const heldIdenticalDice = [...new Set(heldDiceValues)]; //I'm checking if the dice objects are all identical.Minus id field.
      if ((heldIdenticalDice.length == 1) & (heldDiceValues.length == 10)) {
        setGameIsActive(false);
      }
    }

    checkWin();
  }, [dice]);

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
      {!gameIsActive && <Confetti className="confetti" />}
      <h1>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceComponents}</div>

      {gameIsActive ? (
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      ) : (
        <button className="roll" onClick={resetGame}>
          Reset Game
        </button>
      )}
    </div>
  );
}

export default App;
