import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { totalAmount } from "../../redux/Cart/cart.utils";
import Title from "../../assets/title.jpg";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { v4 as uuidv4 } from "uuid";
function Drawer({ deleteProduct, updateQuantity, modal, closeModal }) {
  const ref = useRef();
  const cart = useSelector((state) => state.cart.cart);
  const total = useMemo(() => {
    return totalAmount(cart);
  }, [cart]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modal && ref.current && !ref.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [modal]);
  return (
    <div className="drawer" ref={ref}>
      <div className="wrap">
        <div className="heading">
          <img src={Title} alt="Heading image" className="heading__image" />
          <h1 className="heading__title">Giỏ hàng</h1>
          <CloseIcon className="deleteIcon" onClick={() => closeModal()} />
        </div>
        {cart.length !== 0 && cart !== undefined ? (
          <div>
            <div className="cart">
              {cart.map((cartItem) => {
                if (cartItem !== undefined && cartItem.product !== undefined) {
                  return (
                    <div className="productCart" key={uuidv4()}>
                      <div className="image">
                        <Link to={`../product/${cartItem.product.productId}`}>
                          {cartItem.product.img && (
                            <img
                              src={cartItem.product.img}
                              alt="Ảnh sản phẩm"
                            />
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
                            }).format(
                              cartItem.product.price * cartItem.quantity
                            )}
                          </h4>
                        </div>
                        <div className="wrapContent">
                          <h3 className="size">{cartItem.product.size}</h3>
                          <div className="quantity">
                            <span
                              onClick={() => {
                                if (cartItem.quantity > 1) {
                                  updateQuantity(
                                    cartItem,
                                    cartItem.quantity - 1
                                  );
                                }
                              }}
                            >
                              -
                            </span>

                            <span>{cartItem.quantity}</span>
                            <span
                              onClick={() =>
                                updateQuantity(cartItem, cartItem.quantity + 1)
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>
                        <button
                          className="button"
                          onClick={() => deleteProduct(cartItem)}
                        >
                          Xóa khỏi giỏ hàng
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="totalAmount">
              <h3 className="total">
                Tổng tiền ({cart.length} sản phẩm):{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </h3>
              <Link to="/checkout" className="btnCheckout">
                Xem giỏ hàng
              </Link>
              <Link to="/payment" className="btnPayment">
                Thanh toán
              </Link>
            </div>
          </div>
        ) : (
          <div className="nothingHere">
            <ShoppingCartIcon className="icon" />
            <h3 className="title">Chưa có sản phẩm trong giỏ hàng</h3>
            <Link to="/category/all" className="button">
              Vào trang sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
