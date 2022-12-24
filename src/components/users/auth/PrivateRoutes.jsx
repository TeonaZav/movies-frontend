import { useContext } from "react";
import { AuthContext } from "./AccountContext";
import { Outlet, Navigate } from "react-router";
export const PrivateRoutes = () => {
  const auth = useContext(AuthContext);
  return auth.isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
