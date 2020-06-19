import React from "react";
import "./question.css";
import imageSrc from "../../assets/user_avatar.png";
export const Question = (props) => {
  return (
    <div className="question-container">
      <p className="bubble" key={props.timestamp}>
        {props.question}{" "}
        <img src={imageSrc} alt="User" width="20" height="20"></img>
      </p>
      <div className="timestamp">{props.timestamp}</div>
    </div>
  );
};
