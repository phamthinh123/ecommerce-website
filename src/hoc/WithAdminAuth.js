import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../customHooks/useAdminAuth";

const WithAdminAuth = (props) =>
  useAdminAuth(props) ? props.children : <Navigate to="/login" />;
export default WithAdminAuth;
