import { Navigate } from "react-router-dom";
import { getUserRole } from "../api/auth";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/soal" replace />;
    }

    if (role === "player") {
      return <Navigate to="/games" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};
