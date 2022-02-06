import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Facebook from "../../assets/facebook.png";
import Insta from "../../assets/instagram.png";
import Twitter from "../../assets/twitter.png";
import Youtube from "../../assets/youtube.png";
import "./style.scss";
function Footer(props) {
  return (
    <div className="footer">
      <div className="info">
        <img src={Logo} />
        <h2>Về holame store</h2>
        <span>
          Sứ mệnh của Holame Store là đem đến những sản phẩm gia dụng, trang trí
          nhà cửa, gốm sứ cao cấp chất lượng nhất đến mọi nhà với triết lý kinh
          doanh bằng sự chân thành và tử tế.
        </span>
      </div>
      <div className="content">
        <div className="content1">
          <h2>Về holame store</h2>
          <Link to="/">Giới thiệu</Link>
          <Link to="/">Liên hệ với chúng tôi</Link>
          <Link to="/">Đối tác của chúng tôi</Link>
        </div>
        <div className="content1">
          <h2>Hỗ trợ khách hàng</h2>
          <Link to="/">Hướng dẫn đặt hàng</Link>
          <Link to="/">Hướng dẫn áp dụng mã giảm giá</Link>
          <Link to="/">Câu hỏi thường gặp</Link>
          <Link to="/">Hình thức thanh toán</Link>
          <Link to="/">Câu hỏi thường gặp</Link>
        </div>
        <div className="content1">
          <h2>Kết nối với holame store</h2>
          <div className="socialMedia">
            <Link to="/">
              <img src={Facebook} />
            </Link>
            <Link to="/">
              <img src={Insta} />
            </Link>
            <Link to="/">
              <img src={Youtube} />
            </Link>
            <Link to="/">
              <img src={Twitter} />
            </Link>
          </div>
        </div>
        <div className="content1">
          <h2>Thông tin liên hệ</h2>
          <span>Hotline: 0964.411.582</span>
          <span>Email: holame.cskh@gmail.com</span>
          <span>
            Thời gian làm việc: 07h30 – 22h00, tất cả các ngày trong tuần
          </span>
          <span>Địa chỉ: Đông Anh, Hà Nội</span>
        </div>
        <div className="content1">
          <h2>Chính sách & Bảo mật</h2>
          <Link to="/">Chính sách vận chuyển</Link>
          <Link to="/">Chính sách đổi trả</Link>
          <Link to="/">Chính sách bảo hành đồ điện</Link>
          <Link to="/">Bảo mật thông tin</Link>
        </div>
        <div className="content1">
          <h2>Bộ sưu tập</h2>
          <div className="keyword">
            <Link to="/">bát đĩa sứ lẻ</Link>
            <Link to="/">Bộ bình ombre</Link>
            <Link to="/">Bộ sưu tập gốm sứ cherry</Link>
            <Link to="/">Tô - đĩa sứ hoa lá bốn mùa</Link>
            <Link to="/">Tô salad</Link>
            <Link to="/">Tô sứ ăn mỳ</Link>
            <Link to="/">xanh cổ vịt</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
