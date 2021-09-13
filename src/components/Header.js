import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
const Header = (props) => {
  return (
    <div style={{ "z-index": "-1" }}>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <img src="/fstock.png" alt="" />
          </Link>
        </div>
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link>About</Link>
          </li>
          <li className="navbar__item">
            <Link>Feedback</Link>
          </li>
        </ul>
      </nav>
      {props.children}
    </div>
  );
};

export default Header;
