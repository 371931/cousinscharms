import axios from "axios";

console.log("API_URL:", process.env.API_URL);

const apiClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
