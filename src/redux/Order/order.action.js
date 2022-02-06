import { firestore } from "../../firebase/utils";
import { deleteCart } from "../Cart/cart.action";
import { cartConstant } from "../Cart/cart.constant";
import { orderConstant } from "../Order/order.constant";
import { doc, getDoc } from "firebase/firestore";
export const addOrderToFirestore =
  ({ orderUserId, orderTotal, orderItem, orderCreatedAt }) =>
  async (dispatch) => {
    const orderRef = firestore.collection("orders");
    try {
      await orderRef.add({
        orderUserId,
        orderTotal,
        orderItem,
        orderCreatedAt,
      });

      dispatch(deleteCart());
    } catch (err) {}
  };
export const fetchOrdersByUser = (userId) => async (dispatch) => {
  const ordersRef = firestore
    .collection("orders")
    .orderBy("orderCreatedAt", "desc")
    .where("orderUserId", "==", userId);

  await ordersRef
    .get()
    .then((snap) => {
      return [
        ...snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }),
      ];
    })
    .then((res) => {
      dispatch(setOrders(res));
    });
};
export const setOrders = (orders) => {
  return {
    type: orderConstant.SET_ORDERS,
    payload: orders,
  };
};
export const fetchOrderById = (orderId) => async (dispatch) => {
  const orderRef = firestore.collection("orders").doc(orderId);

  await orderRef
    .get()
    .then((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    })
    .then((res) => {
      dispatch(setOrder(res));
    });
};
export const setOrder = (order) => {
  return {
    type: orderConstant.SET_ORDER,
    payload: order,
  };
};
