import axios from "axios";

const API_URL = "https://wordly-api.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of endpoints that don't need authentication
const publicEndpoints = [
  '/users/register/',
  '/users/login/',
  // Add other public endpoints here
];

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    // Check if the endpoint is public
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );

    // Only add token for non-public endpoints
    if (!isPublicEndpoint) {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;