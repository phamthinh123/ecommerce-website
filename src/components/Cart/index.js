import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import {
  deleteProductFromCart,
  updateQuantityProduct,
} from "../../redux/Cart/cart.action";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { v4 as uuidv4 } from "uuid";
function Cart(props) {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const updateQuantity = (cartItem, quantity) => {
    dispatch(updateQuantityProduct(cartItem, quantity));
  };
  const deleteProduct = (cartItem) => {
    dispatch(deleteProductFromCart(cartItem));
  };
  return (
    <div className="cart">
      {cart.length !== 0 && cart !== undefined ? (
        <div className="listProduct">
          <table className="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart !== undefined &&
                cart.length !== 0 &&
                cart.map((cartItem) => {
                  if (
                    cartItem !== undefined &&
                    cartItem.product !== undefined
                  ) {
                    return (
                      <tr key={uuidv4()}>
                        <td>
                          <Link to={`../product/${cartItem.product.productId}`}>
                            {cartItem.product.img && (
                              <img
                                src={cartItem.product.img}
                                alt="Ảnh sản phẩm"
                              />
                            )}
                          </Link>
                        </td>
                        <td>
                          <Link to={`../product/${cartItem.product.productId}`}>
                            {cartItem.product.title}
                          </Link>
                        </td>
                        <td>{cartItem.product.size}</td>
                        <td>
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
                        </td>

                        <td>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(cartItem.product.price * cartItem.quantity)}
                        </td>
                        <td>
                          <div className="wrap">
                            <div>
                              <DeleteIcon
                                className="deleteIcon"
                                onClick={() => deleteProduct(cartItem)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
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
  );
}

export default Cart;
