import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="logo">InfoNBA</div>
      <nav className="nav-links">
        <a href="#">Início</a>
        <a href="#">Times</a>
        <a href="#">Jogadores</a>
      </nav>
    </header>
  );
};

export default Header;
