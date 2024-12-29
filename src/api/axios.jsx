import axios from "axios";

const API = axios.create({
  baseURL: "https://hostel-management-backend-g35l.onrender.com/api/auth", //backend url
});

//Add token to request headers
API.interceptors.request.use((config) => {
  const userData =JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
