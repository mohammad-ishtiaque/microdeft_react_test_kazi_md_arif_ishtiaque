import { Navigate, Outlet } from "react-router";
import { useAuth } from "../AuthContext";

export default function PrivateOutlet() {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />;
}