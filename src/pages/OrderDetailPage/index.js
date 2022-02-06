import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../redux/Order/order.action";
import "./style.scss";
const OrderDetailPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, []);
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="orderDetailPage">
      <h1 className="title">Order id: {orderId}</h1>

      <div className="manageProduct">
        <table className="table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Size</th>
              <th>Giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>

          <tbody>
            {order.orderItem !== undefined &&
              order.orderItem.length !== 0 &&
              order.orderItem.map((product) => {
                return (
                  <tr key={product.product.productId}>
                    <td>
                      {product.product.img && (
                        <img src={product.product.img} alt="Ảnh sản phẩm" />
                      )}
                    </td>
                    <td>{product.product.title}</td>
                    <td>{product.product.size}</td>
                    <td>{numberFormat.format(product.product.price)}</td>
                    <td>{product.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <h2 className="totalAmount">
        Tổng tiền: {numberFormat.format(order.orderTotal)}
      </h2>
    </div>
  );
};

export default OrderDetailPage;
