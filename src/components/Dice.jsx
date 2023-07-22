import PropTypes from "prop-types";

const Dice = ({ id, value, isHeld, hold }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  function handleClick() {
    hold(id);
  }

  return (
    <button className="dice" style={styles} onClick={handleClick}>
      {value}
    </button>
  );
};

Dice.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
  isHeld: PropTypes.bool,
  hold: PropTypes.func,
};

export default Dice;
