import React from "react";
import { Link } from "react-router-dom";
import "./LeftSidebar.css";

const LeftSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>infoNBA</h2>
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
