import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./botmessage.css";
import { Video } from "../Video/Video.js";
import { Image } from "../Image/Image.js";
import imageSrc from "../../assets/bot_avatar.jpg";
import Speech from "react-speech";
import { PDF } from "../PDF/PDF.js";
export const BotMessage = (props) => {
  // console.log(props)
  const speechStyle = {
    container: {},
    text: {},
    buttons: {},
    play: {
      hover: {
        boxShadow: "0 0 15px 0 rgba(108,92,231,.69)",
        // backgroundColor: 'GhostWhite',
      },
      button: {
        width: "28",
        height: "28",
        cursor: "pointer",
        pointerEvents: "none",
        outline: "none",
        backgroundColor: "#a29bfe",
        border: "solid 1px #a29bfe",
        borderRadius: 6,
      },
    },
    pause: {
      hover: {},
      button: {},
    },
    stop: {
      hover: {},
      button: {},
    },
    resume: {
      hover: {},
      button: {},
    },
  };
  return (
    <div className="botmessage-container">
      <div className="botmessage-bubble">
        <div style={{ margin: "0px 25px 0px 25px" }}>
          {ReactHtmlParser(props.response)}
          </div>
          <Speech
            styles={speechStyle}
            // Better use htmlparsing and get innerhtml instead of regex
            text={props.response.replace(/<\/?[^>]+(>|$)/g, " ")}
            textAsButton={true}
            displayText="🔉"
            voice="Google UK English Female"
          />
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
      <div className="timestamp">{props.timestamp}
      </div>
     
    </div>
  );
};
