import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Ecomm Experiment</h1>
      <Link style={linkStyle} to="/">
        Order
      </Link>{" "}
      |{" "}
      <Link style={linkStyle} to="/cart">
        Checkout
      </Link>
    </header>
  );
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "2em",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default Header;
