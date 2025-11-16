// src/components/RouteGuard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RouteGuard = ({
  children,
  requireAuth = false,
  redirectIfAuth = false,
}) => {
  const { session } = useAuth();

  if (requireAuth && !session) {
    return <Navigate to="/" replace />;
  }

  if (redirectIfAuth && session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RouteGuard;
