import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";

function WithAuth(props) {
  if (useAuth(props)) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default WithAuth;
