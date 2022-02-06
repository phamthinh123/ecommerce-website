import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function FullWidthLayout(props) {
  return (
    <div className="fullWidthLayout">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default FullWidthLayout;
