import React from "react";

export const Image = (props) => {
  return (
    <p className="bubble" key={props.questionIndex}>
      <audio controls>
        <source
          src={props.audioUrl}
          type={
            props.audioUrl.endsWith("mp3")
              ? "audio/mpeg"
              : props.audioUrl.endsWith("ogg")
              ? "audio/ogg"
              : null
          }
        />
        Your browser does not support the audio element.
      </audio>
    </p>
  );
};
