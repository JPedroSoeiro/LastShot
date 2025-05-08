import React from "react";
import { NavLink } from "react-router-dom";
import "./../style/LeftSidebar.css";
import lastShotLogo from "../assets/lastShotLogo.png";

const LeftSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <img src={lastShotLogo} alt="logo" width="150" height="150" />
      <hr />
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/times"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Times
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jogadores"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Jogadores
          </NavLink>
        </li>
      </ul>
      <div className="logout">
        <button>
          <a href={`/`}>Sair</a>
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
