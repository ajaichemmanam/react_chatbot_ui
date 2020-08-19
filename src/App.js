import React from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow/ChatWindow";
const dotenv = require("dotenv");
dotenv.config();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
      </header>

      <ChatWindow />
      <footer>
        <p> Copyright 2020 - Ajai John Chemmanam </p>
      </footer>
    </div>
  );
}

export default App;
