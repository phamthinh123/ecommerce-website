import { productConstant } from "./product.constant";

const initialState = {
  products: [],
  product: null,
  data: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstant.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productConstant.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case productConstant.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
