import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserIsAdmin } from "../utils/checkUserIsAdmin";

export const useAdminAuth = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  if (!currentUser) {
    return null;
  } else if (checkUserIsAdmin(currentUser)) {
    return true;
  } else {
    return null;
  }
};
