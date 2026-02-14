import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://ai-chatbot-p386.onrender.com";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Set token in header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Auth APIs
export const RegisterUser = (data) =>
  API.post("/api/user/register", data);

export const LoginUser = (data) =>
  API.post("/api/user/login", data);

// Google login redirect
export const GoogleLogin = () => {
  window.location.href = `${BASE_URL}/auth/google`;
};

export default API;
