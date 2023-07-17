import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Dice = ({ value, setLockedItems, gameState }) => {
  const [lock, setLock] = useState(false);
  const [diceValue, setDiceValue] = useState(0);

  function changeLock() {
    setLock((prev) => !prev);
  }

  useEffect(() => {
    function addToLockList(itemValue) {
      setLockedItems((prev) => [...prev, itemValue]);
    }

    function removeFromLockList(itemValue) {
      setLockedItems((prev) => {
        const array = [...prev];

        const index = array.findIndex((item) => item === itemValue);
        if (index !== -1) {
          const updatedLockedItems = [...array];
          updatedLockedItems.splice(index, 1);
          console.log(`New locked numbers ${updatedLockedItems}`);
          return updatedLockedItems;
        } else {
          return [...prev];
        }
      });
    }

    function addToOrRemoveFromLockList(itemValue) {
      if (lock) {
        addToLockList(itemValue);
      } else if (!lock) {
        removeFromLockList(itemValue);
      }
    }

    addToOrRemoveFromLockList(diceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lock, setLockedItems, gameState]);

  useEffect(() => {
    !gameState && setLock(false);
  }, [gameState]);

  useEffect(() => {
    !lock && setDiceValue(value);
  }, [value, setDiceValue, lock]);

  return (
    <button
      className={lock ? "dice locked" : "dice unlocked"}
      onClick={changeLock}
    >
      {diceValue}
    </button>
  );
};

Dice.propTypes = {
  value: PropTypes.number,
  setLockedItems: PropTypes.func,
  gameState: PropTypes.bool,
};

export default Dice;
