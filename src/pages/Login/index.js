import React from "react";
import Title from "../../assets/title.jpg";
import SignIn from "../../components/SignIn";
import "./styles.scss";
function Login(props) {
  return (
    <div className="login">
      <div className="heading">
        <img src={Title} alt="Heading image" className="heading__image" />
        <h1 className="heading__title">Tài khoản</h1>
      </div>
      <SignIn />
    </div>
  );
}

export default Login;
