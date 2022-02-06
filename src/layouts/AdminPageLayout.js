import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
function AdminPageLayout(props) {
  return (
    <div className="adminPageLayout">
      <Header />
      <div className="main">
        <SideBar />

        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default AdminPageLayout;
