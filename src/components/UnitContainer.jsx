import React from "react";

const UnitContainer = ({ handleClick, unit }) => {
  return (
    <div className="unit-container">
      <button
        className={unit === "celcius" ? null : "greyed"}
        id="celcius"
        onClick={handleClick}
      >
        °C
      </button>
      <button
        className={unit === "fahrenheit" ? null : "greyed"}
        id="fahrenheit"
        onClick={handleClick}
      >
        °F
      </button>
      <button
        id="kelvin"
        className={unit === "kelvin" ? null : "greyed"}
        onClick={handleClick}
      >
        °K
      </button>
    </div>
  );
};

export default UnitContainer;
