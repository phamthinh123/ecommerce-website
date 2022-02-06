import userReducer from "./User/user.reducer";
import productReducer from "./Product/product.reducer";
import orderReducer from "./Order/order.reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./Cart/cart.reducer";
export const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});
const configStorage = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
export default persistReducer(configStorage, rootReducer);
