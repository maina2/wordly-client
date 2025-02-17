import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useState, useEffect } from "react";
import React, { JSX } from "react";


interface DecodedToken {
  exp: number;
  // Add other token fields you might need
  user_id?: number;
  username?: string;
}

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    authenticateUser().catch(() => setIsAuthorized(false));
  }, []);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      // Updated endpoint to match your Django URL structure
      const response = await api.post("/users/token/refresh/", { 
        refresh: refreshToken 
      });
      
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logoutUser();
    }
  };

  const authenticateUser = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        await refreshAccessToken();
      } else {
        // Verify token with backend
        await api.get("/users/profile/");
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      if ((error as any)?.response?.status === 401) {
        await refreshAccessToken();
      } else {
        setIsAuthorized(false);
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthorized(false);
  };

  if (isAuthorized === null) {
    return <div className="loading-spinner">Authenticating...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;