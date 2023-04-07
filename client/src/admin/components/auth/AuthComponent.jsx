import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComponent() {
  const auth_token = localStorage.getItem("token");
  return auth_token ? <Outlet /> : <Navigate to="/Admin/login" />;
}

export default PrivateComponent;
