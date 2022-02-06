import React from "react";
import imageKitchen from "../../assets/kitchen.jpg";
import imageDecoration from "../../assets/decoration.jpg";
import "./style.scss";
import { Link } from "react-router-dom";
function Directory(props) {
  return (
    <div className="directory">
      <div className="kitchen">
        <Link to="/category/kitchen">
          <img src={imageKitchen} />

          <div className="linear"></div>
        </Link>
      </div>

      <div className="decoration">
        <Link to="category/decoration">
          <img src={imageDecoration} />

          <div className="linear"></div>
        </Link>
      </div>
    </div>
  );
}

export default Directory;
