import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
function UserPageLayout(props) {
  return (
    <div className="userPageLayout">
      <Header />
      <div className="main">
        <SideBar />

        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default UserPageLayout;
