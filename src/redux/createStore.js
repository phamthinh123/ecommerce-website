import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const middlewares = [thunk];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
