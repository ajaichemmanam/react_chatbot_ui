import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();
const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_MESSAGE_ENDPOINT
    : process.env.REACT_APP_DEV_MESSAGE_ENDPOINT;

const headers = {
  "Content-Type": "application/json",
  // 'Authorization': token,
};

export const serviceApi = {
  sendMessage(data) {
    console.log(endpoint, data);
    return axios.post(`${endpoint}`, data, { headers });
  },
};
