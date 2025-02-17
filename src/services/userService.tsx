// userService.tsx
import axios from "axios";

const API_URL = "https://wordly-api.onrender.com/users";

const getAuthToken = () => {
  const token = localStorage.getItem("access");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return token;
};

export const getUserProfile = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Handle unauthorized error - maybe redirect to login
      localStorage.removeItem("token"); // Clear invalid token
      window.location.href = "/login"; // Redirect to login page
    }
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (updatedProfile: { bio: string; avatar: string }) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/profile/`, updatedProfile, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.error("Error updating user profile:", error);
    throw error;
  }
};