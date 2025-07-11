import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
