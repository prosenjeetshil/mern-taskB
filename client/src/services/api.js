import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem("todoapp-token");

    if (storedData) {
      try {
        const { token } = JSON.parse(storedData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Invalid token format");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("todoapp-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
