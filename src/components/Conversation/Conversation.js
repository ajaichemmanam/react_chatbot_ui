import React from "react";
import { Question } from "../Question/Question";
import { Choices } from "../Choices/Choices";
import { Response } from "../Response/Response";

import "./conversation.css";

export class Conversation extends React.Component {
  state = {
    convs: [],
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps", nextProps);
    if (this.state.convs !== nextProps.convs) {
      this.setState({ convs: nextProps.convs });
    }
  }

  renderConversation = () => {
    const conversation = this.state.convs.map((key, index) => {
      // console.log(key, index, "test");
      return (
        <div key={index}>
          {key.question ? (
            <Question question={key.question} timestamp={key.timestamp} />
          ) : key.response ? (
            <Response
              response={key.response}
              videoUrl={key.videoUrl ? key.videoUrl : null}
              imageUrl={key.imageUrl ? key.imageUrl : null}
              timestamp={key.timestamp}
            />
          ) : (
            <Choices
              choices={key.choices}
              isSelected={key.isSelected ? true : false}
              handleChoiceClick={key.choiceCallback}
              timestamp={key.timestamp}
            />
          )}
        </div>
      );
    });
    return (
      <div className="convo-container">
        <div>{conversation}</div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  };
  render() {
    return <>{this.renderConversation()}</>;
  }
}
