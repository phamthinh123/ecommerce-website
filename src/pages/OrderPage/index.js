import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUser } from "../../redux/Order/order.action";
import moment from "moment";
import "./style.scss";
import { Link } from "react-router-dom";
const OrderPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrdersByUser(currentUser.id));
  }, []);
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div className="orderPage">
      <h1 className="title">Lịch sử mua hàng</h1>

      <div className="manageOrder">
        <table className="table">
          <thead>
            <tr>
              <th>Order id</th>
              <th>Order date</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>

          <tbody>
            {orders !== undefined &&
              orders.length !== 0 &&
              orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/order/${order.id}`}>{order.id}</Link>
                    </td>
                    <td>
                      <Link to={`/order/${order.id}`}>
                        {moment(order.orderCreatedAt.toDate()).format(
                          "DD/MM/YYYY hh:mm:ss a"
                        )}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/order/${order.id}`}>
                        {numberFormat.format(order.orderTotal)}
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
