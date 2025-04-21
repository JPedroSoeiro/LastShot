import React from "react";
import "./playersCard.css";

interface players {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  image?: string;
  careerStats: {
    PPG: number;
    RPG: number;
    APG: number;
    SPG: number;
    BPG: number;
    FG: number;
    FG3: number;
    FT: number;
  };
}

interface PlayerCardProps {
  players: players;
  teamLogo?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ players, teamLogo }) => {
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
          <img
            src={teamLogo}
            alt={`Logo do ${players.team}`}
            className="team-logo"
          />
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
      </div>
    </div>
  );
};

export default PlayerCard;
