import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();
var nodeEnv = process.env.NODE_ENV;
// var nodeEnv = "production";
const endpoint =
  nodeEnv === "production"
    ? process.env.REACT_APP_PROD_MESSAGE_ENDPOINT
    : process.env.REACT_APP_DEV_MESSAGE_ENDPOINT;

console.log(endpoint);
const headers = {
  "Content-Type": "application/json",
  // 'Authorization': token,
};

export const serviceApi = {
  sendMessage(data) {
    // console.log(endpoint, data);
    return axios.post(`${endpoint}`, data, { headers });
  },
};
