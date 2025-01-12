import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    "https://samvaad-backend-7r2qzq091-homosapian1999s-projects.vercel.app",
  withCredentials: true,
});
