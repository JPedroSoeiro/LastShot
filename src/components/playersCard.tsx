import React from "react";
import "./playersCard.css";

interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  image?: string;
}

interface PlayerCardProps {
  players: Player;
  teamLogo?: string;
  onDelete?: (id: number) => void; // 🔁 nova prop
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  players,
  teamLogo,
  onDelete,
}) => {
  const handleDelete = () => {
    if (window.confirm(`Deseja realmente excluir ${players.name}?`)) {
      onDelete?.(players.id);
    }
  };

  return (
    <div className="playersCard">
      <div className="topo">
        <div className="space"></div>
        {players.image && (
          <img
            src={players.image}
            alt={`${players.name}`}
            width="80"
            height="120"
          />
        )}
        {teamLogo && (
          <img src={teamLogo} alt={`${players.team}`} className="team-logo" />
        )}
      </div>
      <div className="infoP">
        <h1>{players.name}</h1>
        <div className="infoPessoais">
          <p>
            <strong>Idade:</strong> {players.age}
          </p>
          <p>
            <strong>Time:</strong> {players.team}
          </p>
          <p>
            <strong>Posição:</strong> {players.position}
          </p>
        </div>
        {onDelete && (
          <button className="btn-delete" onClick={handleDelete}>
            Excluir
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
