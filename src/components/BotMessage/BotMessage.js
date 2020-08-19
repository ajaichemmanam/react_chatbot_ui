import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./botmessage.css";
import { Video } from "../Video/Video.js";
import { Image } from "../Image/Image.js";
import imageSrc from "../../assets/bot_avatar.jpg";

import { PDF } from "../PDF/PDF.js";
export const BotMessage = (props) => {
  // console.log(props)
  return (
    <div className="botmessage-container">
      <div className="botmessage-bubble">
        <div style={{ margin: "0px 25px 0px 25px" }}>
          {ReactHtmlParser(props.response)}
        </div>
        <img
          className="avatar"
          src={imageSrc}
          alt="User"
          width="20"
          height="20"
        ></img>
      </div>
      
      {props.pdfUrl ? <PDF pdfUrl={props.pdfUrl} /> : null}
      {props.videoUrl ? <Video videoUrl={props.videoUrl} /> : null}
      {props.imageUrl ? <Image imageUrl={props.imageUrl} /> : null}
      <div className="timestamp">{props.timestamp}</div>
    </div>
  );
};
