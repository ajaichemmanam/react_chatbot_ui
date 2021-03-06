import React from "react";
import "./buttons.css";
// import imageSrc from "../../assets/enter.png";
export const Buttons = (props) => {
  const renderBubble = (_value, _name, _key, isSelected) => {
    return (
      <button
        value={_value}
        name={_name}
        className={isSelected ? "selected s bubble" : "s bubble"}
        onClick={props.handleChoiceClick}
        key={_key}
      >
        {_key}
      </button>
    );
  };

  const resp = props.choices.map((key, index) => {
    return renderBubble(index, props.questionIndex, key, props.isSelected);
  });
  return <div className="buttons-container"> {resp} 
   {/* <img src={imageSrc} alt="User" width="20" height="20"></img> */}
  </div>;
};
