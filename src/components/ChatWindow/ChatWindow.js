import React from "react";
import { Conversation } from "../Conversation/Conversation";
import "./chatwindow.css";
import imageSrc from "../../assets/enter.jpg";

import { serviceApi } from "../../data/api.js";

var moment = require("moment");

// Generate a UUID
function CreateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class ChatWindow extends React.Component {
  state = {
    uuid: "",
    inputText: "",
    convers: [],
    showTyping: false,
  };

  componentDidMount() {
    var uuid = CreateUUID();
    // console.log("userid", uuid);
    this.setState({ uuid: uuid });
  }

  onChoiceResponse = (e) => {
    let con = this.state.convers;
    // iterate over each element in the array
    for (var i = 0; i < con.length; i++) {
      if (con[i]["choices"]) {
        let choicelist = con[i]["choices"];
        con.splice(i, 1);
        var chosedValue = choicelist[e.target.value];
        // con.push({ question: chosedValue});
      }
    }
    this.setState({ convers: con });
    this.sendMessage(chosedValue);
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

  addMessage = (message) => {
    let con = this.state.convers;
    if (message.recipient_id.toString() === this.state.uuid) {
      if (message.text) {
        con.push({
          response: message.text,
          timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        });
      }
      if (message.image) {
        con.push({
          imageUrl: message.image,
          timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        });
      }

      // Support custom messages
      if (message.custom) {
        message.custom.forEach((customMessage) => {
          // audio
          if (customMessage.audio) {
            con.push({
              response: customMessage.description,
              audioUrl: customMessage.audio,
              timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
            });
          }

          // video
          if (customMessage.video) {
            con.push({
              response: customMessage.description,
              videoUrl: customMessage.video.replace(
                "https://www.youtube.com/watch?v=",
                "https://www.youtube.com/embed/"
              ),
              timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
            });
          }

          // document
          if (customMessage.document) {
            con.push({
              response: customMessage.description,
              pdfUrl: customMessage.document,
              timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
            });
          }
          // image
          if (customMessage.image) {
            con.push({
              response: customMessage.description,
              imageUrl: customMessage.image,
              timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
            });
          }
        });
      }

      if (message.buttons) {
        var buttons = [];
        message.buttons.forEach((button) => {
          buttons.push(button.title);
        });
        con.push({
          choices: buttons,
          choiceCallback: this.onChoiceResponse,
          isSelected: null,
          timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        });
      }
    }
    this.setState({ convers: con });
  };

  sendMessage = (query) => {
    let con = this.state.convers;
    con.push({
      question: query,
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    this.setState({ inputText: "", convers: con });
    serviceApi
      .sendMessage({
        sender: this.state.uuid,
        message: query,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ showTyping: false });
          var promise = Promise.resolve();
          res.data.forEach((message, idx) => {
            promise = promise.then(
              function () {
                this.setState({ showTyping: true });
                this.addMessage(message);
                if (idx === res.data.length - 1) {
                  this.setState({ showTyping: false });
                }
                return new Promise(function (resolve) {
                  setTimeout(
                    resolve,
                    message.text
                      ? message.text.length < 20
                        ? message.text.length * 100
                        : 2000
                      : 1000
                  );
                });
              }.bind(this)
            );
            // Verify recipient id
          });
          // console.log(res.data);
        }
      });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.checkActivePrompt();

    let query = this.state.inputText;
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
    this.sendMessage(query);
  };

  render() {
    return (
      <div className="chatwindow">
        <div className="chatHeader">Test Bot</div>
        <Conversation convs={this.state.convers} />
        {this.state.showTyping ? (
          // <div className="botTyping typewriter" style={{ fontSize: "10pt" }}>
          //   Typing...
          // </div>
          <div class="botTyping">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
            </div>
        ) : (
          <div style={{ height: "58px" }}></div>
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

export default ChatWindow;
