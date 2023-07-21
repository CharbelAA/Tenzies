import { useState, useEffect } from "react";
import "./App.css";
import Dice from "./components/Dice";

function App() {
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [lockedItems, setLockedItems] = useState([]);
  const [win, setWin] = useState(false);
  const [gameState, setGameState] = useState(false);

  const diceComponents = diceValues.map((value, index) => {
    return (
      <Dice
        key={index}
        value={value}
        setLockedItems={setLockedItems}
        gameState={gameState}
      />
    );
  });
  //I am improving this code.
  function rollDice() {
    !gameState && setGameState(true);
    const newDice = diceValues.map(() => {
      return Math.floor(Math.random() * 6) + 1;
    });

    setDiceValues(newDice);
  }

  useEffect(() => {
    function checkWin() {
      const uniqueArray = [...new Set(lockedItems)];
      if (lockedItems.length == 10 && uniqueArray.length == 1) {
        setWin(true);
      }
    }

    gameState && checkWin();
  }, [lockedItems, setWin, gameState]);

  function resetGame() {
    setWin(false);
    setLockedItems([]);
    setDiceValues([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setGameState(false);

    //need to do a force reset - feed the dice component a function that does the oposite of the existing state
  }

  console.log("app rendered");
  return (
    <div className="gameboard">
      <h1>Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceComponents}</div>
      <button className="roll" onClick={win ? resetGame : rollDice}>
        {win ? "You won!" : "Roll"}
      </button>
    </div>
  );
}

export default App;
