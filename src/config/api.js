// src/config/api.js
import axios from "axios";

// Define API base URLs using environment variables (with fallbacks)
export const USER_API = process.env.REACT_APP_USER_API || "https://jsonplaceholder.typicode.com/users";
export const PRODUCT_API = process.env.REACT_APP_PRODUCT_API || "https://fakestoreapi.com/products";

// Create an Axios instance with default settings
export const apiClient = axios.create({
  baseURL: "", // ✅ Removed "/" to avoid conflicts
  headers: {
    "Content-Type": "application/json",
  },
});
