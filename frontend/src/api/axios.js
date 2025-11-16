// src/api/axios.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

apiClient.interceptors.request.use(
  (config) => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
