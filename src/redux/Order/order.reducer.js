import { orderConstant } from "./order.constant";
const initialState = {
  orders: [],
  order: {},
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstant.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case orderConstant.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
export default orderReducer;
