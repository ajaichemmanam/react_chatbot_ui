import React from "react";
import "./response.css";
import { Video } from "../Video/Video.js";
import { Image } from "../Image/Image.js";
import imageSrc from "../../assets/bot_avatar.jpg";
export const Response = (props) => {
  return (
    <div className="response-container">
      <p className="response-bubble">
        {props.response}
        <img
          className="avatar"
          src={imageSrc}
          alt="User"
          width="20"
          height="20"
        ></img>
      </p>
      {props.videoUrl ? <Video videoUrl={props.videoUrl} /> : null}
      {props.imageUrl ? <Image imageUrl={props.imageUrl} /> : null}
      <div className="timestamp">
      {props.timestamp}
      </div>
    </div>
  );
};
