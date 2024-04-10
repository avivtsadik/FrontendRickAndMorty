import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
        "Access-Control-Allow-Origin": [
          import.meta.env.VITE_APP_BASE_URL,
          import.meta.env.VITE_APP_REDIRECT_URI,
        ].join(","),
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
};

const AxiosInstance = axios.create(axiosConfig);

export default AxiosInstance;
