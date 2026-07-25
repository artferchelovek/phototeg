import { Navigate, Outlet } from "react-router-dom";

export default function AuthMiddleware() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/auth"} replace />;
  }

  return <Outlet />;
}
