import React, { useEffect, useState } from "react";
import "./style.scss";
import Title from "../../assets/title.jpg";
import {
  Link,
  Navigate,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Test from "../../assets/dia-su-chu-nhat-bon-mua-hoa-la-1.jpg";
import { fetchData } from "../../redux/Product/product.action";
import ProductCard from "../../components/ProductCard";
import LeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RightIcon from "@mui/icons-material/ChevronRight";
import classNames from "classnames";
function Category(props) {
  const data = useSelector((state) => state.product.data);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);

  const [orderPrice, setOrderPrice] = useState("asc");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const navigate = useNavigate();
  const [categoryInput, setCategoryInput] = useState();
  let { category } = useParams();

  useEffect(() => {
    setCategoryInput(category);
    setOrderPrice(orderPrice);
    setMin(min);
    setMax(max);
    dispatch(fetchData(undefined, [], 3, category, orderPrice, min, max));
  }, [category]);

  let title;
  if (category === "kitchen") {
    title = "Đồ dùng nhà bếp";
  } else if (category === "decoration") {
    title = "Trang trí nhà cửa";
  } else {
    title = "Tất cả sản phẩm";
  }
  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const filterPrice = () => {
    if (min > max) {
      return;
    } else {
      dispatch(fetchData(undefined, [], 3, category, orderPrice, min, max));
    }
  };
  if (data.listProduct !== undefined && data.listProduct.length == 0) {
    dispatch(fetchData(undefined, [], 3, category, orderPrice, min, max));
  }
  const nextPage = () => {
    if (data !== undefined) {
      dispatch(
        fetchData(data.lastVisible, [], 3, category, orderPrice, min, max)
      );
    }
  };
  const previousPage = () => {
    if (data !== undefined) {
      dispatch(
        fetchData(
          undefined,
          [],
          3,
          category,
          orderPrice,
          min,
          max,
          data.firstProduct
        )
      );
    }
  };

  return (
    <div className="category">
      <div className="heading">
        <img src={Title} alt="Heading image" className="heading__image" />
        <h1 className="heading__title">{title}</h1>
      </div>

      <div className="sideBar">
        <h3 className="label">Danh mục sản phẩm</h3>
        <select
          name="category"
          id="category"
          className="select"
          value={categoryInput}
          onChange={(e) => {
            navigate(`/category/${e.target.value}`);
          }}
          className="input"
        >
          <option value="all">Tất cả</option>
          <option value="kitchen">Đồ dùng nhà bếp</option>
          <option value="decoration">Trang trí nhà cửa</option>
        </select>
        <h3 className="label">Khoảng giá</h3>
        <div className="price">
          <input
            name="price"
            id="price"
            type="number"
            min={0}
            max={10000000}
            step={1000}
            value={min}
            onChange={(e) => {
              setMin(e.target.value);
            }}
            className="input"
          />
          <input
            name="price"
            id="price"
            type="number"
            min={0}
            max={10000000}
            step={1000}
            value={max}
            onChange={(e) => {
              setMax(e.target.value);
            }}
            className="input"
          />
        </div>
        <button className="btnPrice" onClick={filterPrice}>
          Áp dụng
        </button>
        <h3 className="label">Sản phẩm mới nhất</h3>
        <div className="newProduct">
          {products !== undefined &&
            products.slice(0, 3).map((product) => {
              if (product !== undefined) {
                return (
                  <div className="productCart" key={product.id}>
                    <div className="image">
                      <Link to={`../product/${product.id}`}>
                        {product.img && (
                          <img src={product.img} alt="Ảnh sản phẩm" />
                        )}
                      </Link>
                    </div>

                    <div className="info">
                      <div className="title">
                        <Link to={`../product/${product.id}`}>
                          <h3>{product.title}</h3>
                        </Link>
                      </div>
                      <div className="price">
                        <h4>{numberFormat.format(product.price)}</h4>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>

        <h3 className="label">Từ khóa sản phẩm</h3>
        <div className="keyword">
          <Link to={`/category/${category}`}>bát đĩa sứ lẻ</Link>
          <Link to={`/category/${category}`}>Bộ bình ombre</Link>
          <Link to={`/category/${category}`}>Bộ sưu tập gốm sứ cherry</Link>
          <Link to={`/category/${category}`}>Tô - đĩa sứ hoa lá bốn mùa</Link>
          <Link to={`/category/${category}`}>Tô salad</Link>
          <Link to={`/category/${category}`}>Tô sứ ăn mỳ</Link>
          <Link to={`/category/${category}`}>xanh cổ vịt</Link>
        </div>
      </div>

      <div className="productResult">
        <div className="headerResult">
          <div className="breadcrumb">
            <Link style={{ color: "black", fontWeight: "bold" }} to="/">
              Trang chủ
            </Link>
            <span> &gt; </span>

            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#ffb52e" : "black",
              })}
              to={`/category/${category}`}
            >
              {title}
            </NavLink>
          </div>
          <div className="orderPrice">
            <h4 className="label">Sắp xếp theo</h4>
            <select
              name="category"
              id="category"
              className="select"
              value={orderPrice}
              onChange={(e) => {
                setOrderPrice(e.target.value);
                dispatch(
                  fetchData(
                    undefined,
                    [],
                    3,
                    category,
                    e.target.value,
                    min,
                    max
                  )
                );
              }}
              className="input"
            >
              <option value="asc">Giá: Thấp đến cao</option>
              <option value="desc">Giá: Cao đến thấp</option>
            </select>
          </div>
          <div className="pagination">
            <div
              className={classNames("leftIcon", {
                disable: data.isFirstPage,
              })}
              onClick={previousPage}
            >
              <LeftIcon />
            </div>
            <div
              className={classNames("rightIcon", {
                disable: data.isLastPage,
              })}
              onClick={nextPage}
            >
              <RightIcon />
            </div>
          </div>
        </div>
        <div className="listProduct">
          {data !== undefined &&
            data.listProduct !== undefined &&
            data.listProduct.map((product) => (
              <div style={{ width: 360 }} key={product.id}>
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
        </div>
        {/* {data !== undefined && !data.isLastPage && (
          <button onClick={loadMore} className="btnLoadMore">
            Tải thêm
          </button>
        )} */}
      </div>
    </div>
  );
}

export default Category;
