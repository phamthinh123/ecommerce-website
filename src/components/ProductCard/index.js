import React from "react";
import "./style.scss";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/Cart/cart.action";

function ProductCard({ product }) {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(1);
  }, [size]);
  const addToCart = (productItem) => {
    if (size !== "") {
      dispatch(addProductToCart(productItem));
    }
  };
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="productCard">
      {/* <img src={product.img} /> */}
      <Link to={`../product/${product.id}`}>
        <div className="productImg">
          <img src={product.img} alt="Ảnh sản phẩm" />
        </div>
      </Link>
      <Link to={`../product/${product.id}`}>
        <h2 className="productTitle">{product.title}</h2>
      </Link>
      <h4>{numberFormat.format(product.price)}</h4>
      <div className="action">
        <div className="sizes">
          {product.sizes.map((value, index) => (
            <div
              key={index}
              className={classNames("size", { active: value === size })}
              onClick={() => setSize(value)}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="quantity">
          <span
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </span>

          <span>{quantity}</span>
          <span onClick={() => setQuantity(quantity + 1)}>+</span>
        </div>

        <button
          className="button"
          onClick={() => {
            const { title, des, price, img, category } = product;

            addToCart({
              product: {
                productId: product.id,
                title,
                des,
                price,
                img,
                category,
                size,
              },
              quantity,
            });
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
