import React from "react";
import { Conversation } from "../Conversation/Conversation";
import "./chatwindow.css";
import imageSrc from "../../assets/enter.jpg";

import { serviceApi } from "../../data/api.js";
var moment = require("moment");
export class ChatWindow extends React.Component {
  state = {
    inputText: "",
    convers: [],
    showTyping: false,
  };

  onChoiceResponse = (e) => {
    let con = this.state.convers;
    // iterate over each element in the array
    for (var i = 0; i < con.length; i++) {
      if (con[i]["choices"]) {
        let choicelist = con[i]["choices"];
        con.splice(i, 1);
        con.push({ question: choicelist[e.target.value] });
      }
    }
    this.setState({ convers: con });
  };

  respond = (resp) => {
    this.setState({ showTyping: false });
    let con = this.state.convers;
    con.push({
      response: resp,
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    this.setState({ convers: con });
  };

  onHandleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  checkActivePrompt = () => {
    let con = this.state.convers;
    if (con.length > 0 && con[con.length - 1]["choices"]) {
      con.pop();
      this.setState({ convers: con });
    }
  };

  pushTestMessages = (id) => {
    let con = this.state.convers;
    if (id === 0) {
      this.respond("this is a test reply");
    } else if (id === 1) {
      this.respond("this is a test reply");
      con.push({
        choices: ["choice1", "choice2", "choice3"],
        choiceCallback: this.onChoiceResponse,
        isSelected: null,
      });
    } else if (id === 2) {
      con.push({
        response: "This is a test video",
        videoUrl: "https://www.youtube.com/embed/E7wJTI-1dvQ",
      });
    } else if (id === 3) {
      con.push({
        response: "This is a test image",
        imageUrl: "http://www.mamadomia.org.au/img/under-development.gif",
      });
    }
    this.setState({ inputText: "", convers: con });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.checkActivePrompt();
    let con = this.state.convers;
    let query = this.state.inputText;
    con.push({
      question: query,
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    this.setState({ inputText: "", convers: con });

    // var id = 0;
    // setInterval(
    //   function (self) {
    //     self.setState({ showTyping: true });
    //     self.pushTestMessages(id);
    //     id++;
    //   },
    //   3000,
    //   this
    // );
    this.setState({ showTyping: true });
    serviceApi.sendMessage({ text: query }).then((res) => {
      if (res.status === 200) {
        if (res.data.confidence > 0.5) {
          this.respond(res.data.answer);
        }
        console.log(res.data);
      }
      this.setState({ showTyping: false });
    });
  };

  render() {
    return (
      <div className="chatwindow">
        <div className="chatHeader">Test Bot</div>
        <Conversation convs={this.state.convers} />
        {this.state.showTyping ? (
          <div className="bubble typewriter" style={{ fontSize: "10pt" }}>
            Bot Typing...
          </div>
        ) : (
          <div  style={{height: "58px"}}></div>
        )}
        <div>
          <form className="convform" onSubmit={this.onHandleSubmit}>
            <input
              className="textinput"
              placeholder="Type text"
              onChange={this.onHandleChange}
              value={this.state.inputText}
            ></input>
            <button type="submit" className="enterbutton">
              <img src={imageSrc} className="entericon" alt="Send" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
