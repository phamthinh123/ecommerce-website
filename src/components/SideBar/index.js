import React from "react";
import Account from "@mui/icons-material/AccountCircleTwoTone";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleSignOut } from "../../redux/User/user.action";
function SideBar(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = currentUser;
  const signOutFromWeb = async () => {
    dispatch(handleSignOut());

    navigate("/login");
  };
  return (
    <div className="sideBar">
      <div className="profile">
        <Account className="profile__icon" />

        <h4 className="profile__info">{name}</h4>
      </div>
      <div className="link">
        <div className="linkHone">
          <Link to="../">Home</Link>
        </div>

        <span className="linkSignOut" onClick={signOutFromWeb}>
          Đăng xuất
        </span>
      </div>
    </div>
  );
}

export default SideBar;
