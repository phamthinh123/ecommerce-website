import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import imageFullWidth from "../../assets/imageHomePage.jpg";
import Directory from "../../components/Directory";
import ProductCard from "../../components/ProductCard";
import Slider from "react-slick";
import distributionIcon from "../../assets/san-pham.png";
import deliveryIcon from "../../assets/giao-hang.png";
import consultantIcon from "../../assets/tu-van.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";
import { fetchData } from "../../redux/Product/product.action";
function HomePage(props) {
  const products = useSelector((state) => state.product.products);
  const data = useSelector((state) => state.product.data);
  const dispatch = useDispatch();
  const loadMore = () => {
    if (data !== undefined) {
      dispatch(fetchData(data.lastVisible, data.listProduct));
    }
  };
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const configCarousel = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className="homePage">
      <div>
        <img src={imageFullWidth} className="imageFullWidth" />
      </div>
      <div className="service">
        <div className="service1">
          <h1 className="number">1.</h1>
          <div className="content">
            <h2>Giao hàng</h2>
            <span>Giao hàng COD thu tiền tại nhà, kiểm tra khi nhận hàng.</span>
          </div>
        </div>
        <div className="service1">
          <h1 className="number">2.</h1>
          <div className="content">
            <h2> Đổi trả</h2>
            <span>
              Miễn phí đổi trả hàng lỗi, sai mẫu, vỡ hỏng khi vận chuyển.
            </span>
          </div>
        </div>
        <div className="service1">
          <h1 className="number">3.</h1>
          <div className="content">
            <h2>Hỗ trợ</h2>
            <span>
              Luôn sẵn lòng hỗ trợ khách hàng nhiệt tình 7 ngày trong tuần.
            </span>
          </div>
        </div>
      </div>
      <Directory />
      <div className="newProduct">
        <h1>Sản phẩm mới nhất</h1>
        <div className="listProduct">
          {data !== undefined &&
            data.listProduct !== undefined &&
            data.listProduct.map((product) => (
              <div style={{ width: 410 }} key={product.id}>
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
        </div>
        {data !== undefined && !data.isLastPage && (
          <button onClick={loadMore} className="btnLoadMore">
            Tải thêm
          </button>
        )}
      </div>
      <div className="kitchenProduct">
        <h1>Dành cho fan yêu bếp</h1>
        <Slider {...configCarousel}>
          {products
            .filter((product) => product.category === "Đồ dùng nhà bếp")
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </Slider>
      </div>
      <div className="kitchenProduct">
        <h1>Dành cho fan nghiện nhà</h1>
        <Slider {...configCarousel}>
          {products
            .filter((product) => product.category === "Trang trí nhà cửa")
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </Slider>
      </div>
      <div className="philosophy">
        <div className="philosophy1">
          <h3>Triết lý của Holame Store</h3>
          <h1>We choose Kindness</h1>
          <span>Chúng tôi chọn sự tử tế</span>
          <button>Về HOLAME</button>
        </div>
        <div className="philosophy2">
          <img src={distributionIcon} />
          <h3>Phân phối sản phẩm chất lượng</h3>

          <span>Giá thành đi đôi với chất lượng của sản phẩm</span>
        </div>
        <div className="philosophy3">
          <img src={deliveryIcon} />
          <h3>Quy trình hoạt động được tối ưu hóa</h3>

          <span>Đặt hàng, thanh toán và vận chuyển đơn giản, nhanh chóng</span>
        </div>
        <div className="philosophy4">
          <img src={consultantIcon} />
          <h3>Chăm sóc khách hàng tận tâm</h3>

          <span>Tư vấn viên nhiệt tình, năng động, Hỗ trợ 24/7</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
