import React from "react";

export const Video = (props) => {
  return (
    <p className="bubble" key={props.questionIndex}>
      <iframe
        src={props.videoUrl}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </p>
  );
};
