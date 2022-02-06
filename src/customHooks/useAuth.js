import { useSelector } from "react-redux";

export const useAuth = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  if (!currentUser) {
    return null;
  } else {
    return currentUser;
  }
};
