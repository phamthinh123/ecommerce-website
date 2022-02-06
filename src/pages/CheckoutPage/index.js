import React, { useMemo } from "react";
import Cart from "../../components/Cart";
import Title from "../../assets/title.jpg";
import { useSelector } from "react-redux";
import { totalAmount } from "../../redux/Cart/cart.utils";
import "./style.scss";
import { Link } from "react-router-dom";
function Checkout(props) {
  const cart = useSelector((state) => state.cart.cart);
  const total = useMemo(() => {
    return totalAmount(cart);
  }, [cart]);
  return (
    <div className="checkOut">
      <div className="heading">
        <img src={Title} alt="Heading image" className="heading__image" />
        <h1 className="heading__title">Giỏ hàng</h1>
      </div>
      <div className="totalAmount">
        <h3 className="total">
          Tổng tiền ({cart.length} sản phẩm):{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(total)}
        </h3>
        <Link to="/payment" className="btnPayment">
          Tiến hành thanh toán
        </Link>
      </div>
      <Cart />
    </div>
  );
}

export default Checkout;
