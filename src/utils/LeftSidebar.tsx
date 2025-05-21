import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./../style/LeftSidebar.css";
import lastShotLogo from "../assets/lastShotLogo.png";
import { useAuth } from "../context/AuthProvider";

const LeftSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // remove token e user
    navigate("/"); // redireciona para a página inicial
  };

  return (
    <div className="sidebar">
      <img src={lastShotLogo} alt="logo" width="150" height="150" />
      <hr />
      <ul id="list">
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
      <div>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default LeftSidebar;
