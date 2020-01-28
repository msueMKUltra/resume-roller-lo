import React from "react";
import logo from "../images/resume-logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top roller-navbar">
      <Link to={process.env.PUBLIC_URL + "/"} className="navbar-brand p-3">
        <img src={logo} alt="LOGO" />
      </Link>
    </nav>
  );
};

export default NavBar;
