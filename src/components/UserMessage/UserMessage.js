import React from "react";
import "./usermessage.css";
import imageSrc from "../../assets/user_avatar.png";
export const UserMessage = (props) => {
  return (
    <div className="usermessage-container">
      <div className="bubble" key={props.timestamp}>
      <div style={{margin: '0px 25px 0px 25px'}}>
        {props.question}{" "}
        </div>
        <img src={imageSrc} alt="User" width="20" height="20"></img>
      </div>
      <div className="timestamp">{props.timestamp}</div>
    </div>
  );
};
