import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://samvaad-backend.vercel.app",
  withCredentials: true,
});
