import React from "react";
import "../style/Navbar.css";
import { NavLink } from "react-router-dom";
import "./../style/LeftSidebar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h4>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Não possui conta? Cadastrar-se!
          </NavLink>
        </h4>
        <h4>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Login
          </NavLink>
        </h4>
      </div>
    </nav>
  );
};

export default Navbar;
