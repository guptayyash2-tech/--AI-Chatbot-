import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-chatbot-p386.onrender.com";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});


export const SetAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const RegisterUser = (data) =>
  API.post("/api/user/register", data);

export const LoginUser = (data) =>
  API.post("/api/user/login", data);

export const GoogleLogin = () => {
  window.location.href =
    "https://ai-chatbot-p386.onrender.com/auth/google";
};

export default API;
