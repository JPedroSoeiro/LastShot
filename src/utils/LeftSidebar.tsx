import React from "react";
import "./LeftSidebar.css";

interface Team {
  id: number;
  nome: string;
}

interface LeftSidebarProps {
  teams: Team[];
  onTeamSelect: (team: Team) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ teams, onTeamSelect }) => {
  return (
    <div className="sidebar">
      <h2>Times da NBA</h2>
      <ul>
        {Array.isArray(teams) && teams.length > 0 ? (
          teams.map((team) => (
            <li key={team.id} onClick={() => onTeamSelect(team)}>
              {team.nome}
            </li>
          ))
        ) : (
          <li>Nenhum time disponível</li>
        )}
      </ul>
    </div>
  );
};

export default LeftSidebar;
