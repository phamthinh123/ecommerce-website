import React, { useState } from "react";
import "./styles.scss";
import Logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../firebase/utils";
import { handleSignOut } from "../../redux/User/user.action";
import Drawer from "../Drawer/index";
import {
  deleteProductFromCart,
  updateQuantityProduct,
} from "../../redux/Cart/cart.action";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
function Header(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.product.products);
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const signOutFromWeb = async () => {
    dispatch(handleSignOut());

    navigate("/login");
  };
  const updateQuantity = (cartItem, quantity) => {
    dispatch(updateQuantityProduct(cartItem, quantity));
  };
  const deleteProduct = (cartItem) => {
    dispatch(deleteProductFromCart(cartItem));
  };
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const onKeyUpInput = (e) => {
    if (e.keyCode === 13) {
      const product = products.find((product) => {
        return product.title === e.target.value;
      });
      if (!product) {
        return;
      } else {
        navigate(`/product/${product.id}`);
        setInputValue("");
      }
    }
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo__image" />
        </Link>
      </div>
      <div className="navBar">
        <nav>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#ffb52e" : "black",
            })}
            to="/"
          >
            Trang chủ
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#ffb52e" : "black",
            })}
            to="/category/kitchen"
          >
            Đồ dùng nhà bếp
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#ffb52e" : "black",
            })}
            to="/category/decoration"
          >
            Trang trí nhà cửa
          </NavLink>
        </nav>
      </div>
      <div className="search">
        <div className="wrap">
          {/* <input className="search__input" type="text" /> */}
          <Autocomplete
            freeSolo
            id="free-solo"
            disableClearable
            className="autoComplete"
            style={{ width: "100%", borderBottom: 0 }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={products.map((product) => product.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="none"
                className="search__input"
                onKeyUp={(e) => onKeyUpInput(e)}
                fullWidth
                autoFocus
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  disableUnderline: true,
                }}
              />
            )}
          />

          <div className="search__icon">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="navBarRight">
        <div className="navAuthen">
          <span>Chào {currentUser != null ? currentUser.name : "bạn"}</span>
          {currentUser ? (
            <button
              type="submit"
              onClick={signOutFromWeb}
              className="signOutButton"
            >
              Đăng xuất
            </button>
          ) : (
            <Link to="/login" className="signInButton">
              Đăng nhập
            </Link>
          )}
        </div>

        <Link to="/order">
          <div className="order">
            <span>Đơn hàng</span>
            <span>của bạn</span>
          </div>
        </Link>
      </div>
      <div className="basket">
        <Badge badgeContent={cart.length ? cart.length : "0"} color="error">
          <ShoppingBasketIcon onClick={() => openModal()} />
        </Badge>
      </div>
      {modal && (
        <Drawer
          deleteProduct={deleteProduct}
          updateQuantity={updateQuantity}
          modal={modal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Header;
