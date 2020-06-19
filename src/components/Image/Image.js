import React from "react";

export const Image = (props) => {
  return (
    <p className="bubble" key={props.questionIndex}>
      <img src={props.imageUrl} width="250px" alt="Img Response" />
    </p>
  );
};
