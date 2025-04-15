import React from "react";
import { Link } from "react-router-dom";
import "./LeftSidebar.css";
import lastShotLogo from "../assets/lastShotLogo.png";

const LeftSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <img src={lastShotLogo} alt="logo" width="150" height="150" />
      <hr />
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/times">Times</Link>
        </li>
        <li>
          <Link to="/jogadores">Jogadores</Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
