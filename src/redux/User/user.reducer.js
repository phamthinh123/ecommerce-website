import { userConstant } from "./user.constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../../Toastify/config";
const initialState = {
  currentUser: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.SIGN_OUT_SUCCESS:
      toast.success(
        "Đăng xuất thành công",
        {
          theme: "colored",
        },
        toastConfig
      );
      return {
        ...state,
        ...initialState,
      };

    case userConstant.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userConstant.SIGN_UP_SUCCESS:
      toast.success(
        "Đăng kí thành công",
        {
          theme: "colored",
        },
        toastConfig
      );
      return {
        ...state,
      };
    case userConstant.SIGN_IN_SUCCESS:
      toast.success(
        "Đăng nhập thành công",
        {
          theme: "colored",
        },
        toastConfig
      );
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default userReducer;
