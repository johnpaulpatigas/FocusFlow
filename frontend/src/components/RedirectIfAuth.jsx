import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfAuth = ({ children }) => {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectIfAuth;
