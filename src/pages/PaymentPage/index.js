import React, { useMemo, useState } from "react";
import "./style.scss";
import Title from "../../assets/title.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { totalAmount } from "../../redux/Cart/cart.utils";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import Service from "../../assets/service.png";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { instance } from "../../utils/checkUserIsAdmin";
import { addOrderToFirestore } from "../../redux/Order/order.action";
import { deleteCart } from "../../redux/Cart/cart.action";
import { auth } from "../../firebase/utils";
import { v4 as uuidv4 } from "uuid";
function PaymentPage(props) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = useMemo(() => {
    return totalAmount(cart);
  }, [cart]);
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [name, setName] = useState(() => {
    if (currentUser) {
      return currentUser.name;
    } else {
      return "";
    }
  });
  const [phone, setPhone] = useState(() => {
    if (currentUser) {
      return currentUser.phone;
    } else {
      return "";
    }
  });
  const [email, setEmail] = useState(() => {
    if (currentUser) {
      return currentUser.email;
    } else {
      return "";
    }
  });
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      address === "" ||
      city === ""
    ) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    const timestamp = new Date();

    const order = {
      orderUserId: auth.currentUser.uid,
      orderItem: cart.map((cartItem) => {
        const product = cartItem.product;
        const quantity = cartItem.quantity;
        return {
          product,
          quantity,
        };
      }),
      orderTotal: total,
      orderCreatedAt: timestamp,
    };

    dispatch(addOrderToFirestore(order));

    navigate("/order");

    // instance
    //   .post("/payment/create", {
    //     totalAmount: total,
    //     shipping: {
    //       name,
    //       city,
    //       address,
    //     },
    //   })
    // .then(({ client_secret }) => {
    //   stripe.createPaymentMethod({
    //     type: "card",
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       name,
    //       phone,
    //       email,
    //     },
    //   });
    // })
    // .then(({ paymentMethod }) => {
    //   stripe.confirmCardPayment(client_secret, {
    //     payment_method: paymentMethod.id,
    //   });
    // })
    // .then(({ paymentIntent }) => {
    // const order = {
    //   orderUserId: currentUser.id,
    //   orderItem: cart.map((cartItem) => {
    //     const product = cartItem.product;
    //     const quantity = cartItem.quantity;
    //     return {
    //       product,
    //       quantity,
    //     };
    //   }),
    //   orderTotal: total,
    // };
    // console.log(order);
    // });
  };

  return (
    <div className="paymentPage">
      <div className="heading">
        <img src={Title} alt="Heading image" className="heading__image" />
        <h1 className="heading__title">Thanh toán</h1>
      </div>
      <div className="formInfo">
        <h2 className="form__title">Thông tin thanh toán</h2>
        <div className="inputForm">
          <input
            type="text"
            id="name"
            className="form__name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name" className="form__label">
            Họ và tên
          </label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            id="phone"
            className="form__phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="phone" className="form__label">
            Số điện thoại
          </label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            id="email"
            className="form__email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" className="form__label">
            Địa chỉ email
          </label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            id="city"
            className="form__city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label htmlFor="city" className="form__label">
            Tỉnh/Thành phố
          </label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            id="address"
            className="form__address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="address" className="form__label">
            Địa chỉ
          </label>
        </div>
        <div className="checkbox">
          <input type="checkbox" className="inputCheck" />
          <h5>Đăng ký nhận khuyến mãi</h5>
        </div>
        <Link to="/registration">Tạo tài khoản mới ?</Link>
        <img src={Service} className="serviceImg" />
      </div>
      <div className="payment">
        <h2 className="form__title">Đơn hàng của bạn</h2>
        {cart.length !== 0 && cart !== undefined && (
          <div className="cart">
            <h3 className="title">Sản phẩm</h3>
            {cart.map((cartItem) => {
              if (cartItem !== undefined && cartItem.product !== undefined) {
                return (
                  <div className="productCart" key={uuidv4()}>
                    <div className="image">
                      <Link to={`../product/${cartItem.product.productId}`}>
                        {cartItem.product.img && (
                          <img src={cartItem.product.img} alt="Ảnh sản phẩm" />
                        )}
                      </Link>
                    </div>

                    <div className="info">
                      <div className="title">
                        <Link to={`../product/${cartItem.product.productId}`}>
                          <h3>{cartItem.product.title}</h3>
                        </Link>
                      </div>
                      <div className="price">
                        <h4>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(cartItem.product.price * cartItem.quantity)}
                        </h4>
                      </div>
                      <h3 className="size">{cartItem.product.size}</h3>
                    </div>
                  </div>
                );
              }
            })}
            <h3 className="title">Thông tin thẻ</h3>
            <form onSubmit={handleSubmit}>
              <CardElement options={configCardElement} />
              <div className="totalAmount">
                <h3 className="total">
                  Tổng tiền ({cart.length} sản phẩm):{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </h3>

                <button className="btnPayment" disabled={!stripe || !elements}>
                  Thanh toán
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
