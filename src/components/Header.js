import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
const Header = (props) => {
  return (
    <div style={{ "z-index": "-1" }}>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <img src="/kpmg.png" alt="" />
          </Link>
        </div>
        <Link to="/upload" className="navbar__upload">
          Upload
        </Link>
      </nav>
      {props.children}
    </div>
  );
};

export default Header;
