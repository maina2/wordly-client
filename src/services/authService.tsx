import { AxiosError } from "axios";  // Import AxiosError from axios
import api from "../api";


// Register a new user
export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_picture?: string;
  website?: string;
}) => {
  try {
    const response = await api.post("/users/register/", userData);
    return response.data;
  } catch (error) {
    // Assert that error is an AxiosError
    if (error instanceof AxiosError) {
      console.error("Error registering user:", error.response?.data);
      throw error.response?.data;
    }
    throw error;  // If it's not an AxiosError, rethrow it
  }
};

// Log in a user
export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/login/", credentials);
    // Save the tokens in localStorage
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
  } catch (error) {
    // Assert that error is an AxiosError
    if (error instanceof AxiosError) {
      console.error("Error logging in:", error.response?.data);
      throw error.response?.data;
    }
    throw error;  // If it's not an AxiosError, rethrow it
  }
};

// Refresh JWT token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await api.post("/users/token/refresh/", {
      refresh: refreshToken,
    });
    // Save the new access token in localStorage
    localStorage.setItem("access", response.data.access);
    return response.data;
  } catch (error) {
    // Assert that error is an AxiosError
    if (error instanceof AxiosError) {
      console.error("Error refreshing token:", error.response?.data);
      throw error.response?.data;
    }
    throw error;  // If it's not an AxiosError, rethrow it
  }
};

// Get user profile (requires authentication)
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile/");
    return response.data;
  } catch (error) {
    // Assert that error is an AxiosError
    if (error instanceof AxiosError) {
      console.error("Error fetching user profile:", error.response?.data);
      throw error.response?.data;
    }
    throw error;  // If it's not an AxiosError, rethrow it
  }
};

// Logout user
export const logout = async (refreshToken: string) => {
  try {
    console.log("Logging out with token:", refreshToken); // Debugging
    const response = await api.post("/users/logout/", { refresh_token: refreshToken });

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    console.log("Logout response:", response.data); // Debugging
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
};

