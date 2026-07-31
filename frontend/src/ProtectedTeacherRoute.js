import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedTeacherRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "teacher") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedTeacherRoute;