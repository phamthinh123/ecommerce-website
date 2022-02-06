import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/index";
function HomePageLayout(props) {
  return (
    <div className="homePageLayout">
      <Header />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
}

export default HomePageLayout;
