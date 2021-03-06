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
          <Link to="/">Trang ch???</Link>
          <span> &gt; </span>
          <Link to="/">{product !== null && product.category}</Link>
          <span> &gt; </span>
          <span>{product !== null && product.title}</span>
        </div>

        <h1 className="productTitle">{product !== null && product.title}</h1>
        <h2 className="productPrice">
          {product !== null && numberFormat.format(product.price)}
        </h2>
        <h4>M?? t??? s???n ph???m</h4>
        {product !== null && (
          <div
            className="productDes"
            dangerouslySetInnerHTML={{ __html: product.des }}
            style={{ lineHeight: 1.5 }}
          ></div>
        )}
        <div className="pickSize">
          <h4>Ch???n size:</h4>
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
        <h4>S??? l?????ng</h4>
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
          Th??m v??o gi???
        </button>
        <img src={Service} />
      </div>
      <div className="policy">
        <h2>Ch??nh s??ch mua h??ng</h2>
        <div className="policy1">
          <h2>H??nh th???c thanh to??n</h2>
          <h3>Hi???n t???i, HOLAME h??? tr??? 2 h??nh th???c thanh to??n ????n h??ng:</h3>
          <h4>&gt; Thanh to??n chuy???n kho???n ng??n h??ng</h4>
          <h4>&gt; Thanh to??n ti???n m???t khi nh???n h??ng (COD)</h4>
        </div>
        <div className="policy2">
          <h2>Ch??nh s??ch v???n chuy???n</h2>
          <h3>Ph?? v???n chuy???n</h3>
          <h4>&gt; ?????ng gi?? 30K ????n h??ng d?????i 500K</h4>
          <h4>&gt; Mi???n ph?? v???n chuy???n ????n h??ng t??? 500K</h4>
          <h3>Th???i gian giao h??ng</h3>
          <h4>
            &gt; Khu v???c n???i th??nh H?? N???i v?? c??c t???nh l??n c???n: T??? 1 ??? 2 ng??y
          </h4>
          <h4>&gt; Khu v???c kh??c tr??n c??? n?????c: 3 ??? 5 ng??y</h4>
        </div>
        <div className="policy3">
          <h2>Ch??nh s??ch ?????i tr???</h2>
          <span>
            Holame Store ch???u 100% ph?? ship ?????i tr??? trong tr?????ng h???p s???n ph???m
            nh???n v??? sai m???u, sai m??u s???c, k??ch th?????c, dung t??ch ???. so v???i qu???ng
            c??o, bill ch???t ????n ho???c r??i v???, bi???n d???ng do qu?? tr??nh v???n chuy???n.
          </span>
        </div>
      </div>
      <div className="similarProduct">
        <h1>S???n ph???m t????ng t???</h1>
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
