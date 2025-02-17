import "./App.css";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/landingpage" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
