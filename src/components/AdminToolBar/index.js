import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function AdminToolBar(props) {
  return (
    <div className="adminToolBar">
      <div className="wrap">
        <Link to="admin" className="link">
          Admin
        </Link>
      </div>
    </div>
  );
}

export default AdminToolBar;
