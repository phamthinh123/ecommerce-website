import { cartConstant } from "./cart.constant";
// import toastConfig from "../../Toastify/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../../Toastify/config";
const initialState = {
  cart: [],
};
export const cartReducer = (state = initialState, action) => {
  let index;
  switch (action.type) {
    case cartConstant.ADD_TO_CART:
      index = state.cart.findIndex(
        (cartItem) =>
          cartItem.product.productId === action.payload.product.productId &&
          cartItem.product.size === action.payload.product.size
      );
      if (index !== -1) {
        toast.success(
          "Cập nhật thành công",
          {
            theme: "colored",
          },
          toastConfig
        );
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, index),
            {
              product: action.payload.product,
              quantity: state.cart[index].quantity + action.payload.quantity,
            },
            ...state.cart.slice(index + 1),
          ],
        };
      } else {
        toast.success(
          "Thêm thành công",
          {
            theme: "colored",
          },
          toastConfig
        );
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case cartConstant.UPDATE_QUANTITY:
      index = state.cart.findIndex((x) => x === action.payload.cartItem);

      if (index !== -1) {
        return {
          ...state,
          cart: [
            ...state.cart.slice(0, index),
            {
              ...action.payload.cartItem,
              quantity: action.payload.quantity,
            },
            ...state.cart.slice(index + 1),
          ],
        };
      }
      break;
    case cartConstant.DELETE_PRODUCT_FROM_CART:
      index = state.cart.findIndex((x) => {
        return (
          x.product.productId === action.payload.product.productId &&
          x.product.size === action.payload.product.size
        );
      });

      const newCart = [...state.cart];

      newCart.splice(index, 1);

      toast.success(
        "Xoá thành công",
        {
          theme: "dark",
        },
        toastConfig
      );
      return {
        ...state,
        cart: newCart,
      };

    case cartConstant.DELETE_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
export default cartReducer;
