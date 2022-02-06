import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../redux/Product/product.action";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import Service from "../../assets/service.png";
import classNames from "classnames";
import "./style.scss";
import ProductCard from "../ProductCard";
import ReactImageMagnify from "react-image-magnify";
import { addProductToCart } from "../../redux/Cart/cart.action";
function Product(props) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId]);
  useEffect(() => {
    setQuantity(1);
  }, [size]);

  const products = useSelector((state) => state.product.products);
  let similarProduct;
  if (products !== null) {
    similarProduct = products.filter((x) => {
      if (product !== null) {
        return x.category === product.category && x.id !== product.id;
      }
    });
  }

  const addToCart = (productItem) => {
    if (size !== "") {
      dispatch(addProductToCart(productItem));
    }
  };
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  let productImg;
  if (product !== null) {
    productImg = product.img;
  } else {
    productImg = Test;
  }

  return (
    <div className="product">
      <div className="productImage">
        {/* <img src={product.img} /> */}
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: productImg,
              sizes:
                "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
            },
            largeImage: {
              src: productImg,
              width: 1200,
              height: 1800,
            },

            enlargedImageContainerDimensions: {
              width: "100%",
              height: "100%",
            },
            isHintEnabled: true,
            shouldHideHintAfterFirstActivation: false,
          }}
        />
        {/* <img src={Test} /> */}
      </div>
      <div className="productDetail">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span> &gt; </span>
          <Link to="/">{product !== null && product.category}</Link>
          <span> &gt; </span>
          <span>{product !== null && product.title}</span>
        </div>

        <h1 className="productTitle">{product !== null && product.title}</h1>
        <h2 className="productPrice">
          {product !== null && numberFormat.format(product.price)}
        </h2>
        <h4>Mô tả sản phẩm</h4>
        {product !== null && (
          <div
            className="productDes"
            dangerouslySetInnerHTML={{ __html: product.des }}
            style={{ lineHeight: 1.5 }}
          ></div>
        )}
        <div className="pickSize">
          <h4>Chọn size:</h4>
          <span>{size}</span>
        </div>

        <div className="sizes">
          {product !== null &&
            product.sizes.map((value, index) => (
              <div
                key={index}
                className={classNames("size", { active: value === size })}
                onClick={() => setSize(value)}
              >
                {value}
              </div>
            ))}
        </div>
        <h4>Số lượng</h4>
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
                productId,
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
        <img src={Service} />
      </div>
      <div className="policy">
        <h2>Chính sách mua hàng</h2>
        <div className="policy1">
          <h2>Hình thức thanh toán</h2>
          <h3>Hiện tại, HOLAME hỗ trợ 2 hình thức thanh toán đơn hàng:</h3>
          <h4>&gt; Thanh toán chuyển khoản ngân hàng</h4>
          <h4>&gt; Thanh toán tiền mặt khi nhận hàng (COD)</h4>
        </div>
        <div className="policy2">
          <h2>Chính sách vận chuyển</h2>
          <h3>Phí vận chuyển</h3>
          <h4>&gt; Đồng giá 30K đơn hàng dưới 500K</h4>
          <h4>&gt; Miễn phí vận chuyển đơn hàng từ 500K</h4>
          <h3>Thời gian giao hàng</h3>
          <h4>
            &gt; Khu vực nội thành Hà Nội và các tỉnh lân cận: Từ 1 – 2 ngày
          </h4>
          <h4>&gt; Khu vực khác trên cả nước: 3 – 5 ngày</h4>
        </div>
        <div className="policy3">
          <h2>Chính sách đổi trả</h2>
          <span>
            Holame Store chịu 100% phí ship đổi trả trong trường hợp sản phẩm
            nhận về sai mẫu, sai màu sắc, kích thước, dung tích …. so với quảng
            cáo, bill chốt đơn hoặc rơi vỡ, biến dạng do quá trình vận chuyển.
          </span>
        </div>
      </div>
      <div className="similarProduct">
        <h1>Sản phẩm tương tự</h1>
        <div className="listProduct">
          {similarProduct &&
            similarProduct.slice(0, 3).map((product) => (
              <div style={{ width: 480 }} key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
