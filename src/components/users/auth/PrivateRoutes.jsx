import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";

export const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
