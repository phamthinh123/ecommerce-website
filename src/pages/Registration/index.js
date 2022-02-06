import React from "react";
import Title from "../../assets/title.jpg";
import SignUp from "../../components/SignUp";
import "./styles.scss";
function Registration(props) {
  return (
    <div className="registration">
      <div className="heading">
        <img src={Title} alt="Heading image" className="heading__image" />
        <h1 className="heading__title">Tài khoản</h1>
      </div>
      <SignUp />
    </div>
  );
}

export default Registration;
