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
}

const PlayerCard: React.FC<PlayerCardProps> = ({ players }) => {
  return (
    <div className="playersCard">
      {players.image && (
        <img
          src={players.image}
          alt={`${players.name} logo`}
          width="80"
          height="120"
        />
      )}
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

{
  /* 
       <div className="stats">
          <p>
            <strong>PPG:</strong> {players.careerStats.PPG}
          </p>
          <p>
            <strong>RPG:</strong> {players.careerStats.RPG}
          </p>
          <p>
            <strong>APG:</strong> {players.careerStats.APG}
          </p>
          <p>
            <strong>SPG:</strong> {players.careerStats.SPG}
          </p>
          <p>
            <strong>BPG:</strong> {players.careerStats.BPG}
          </p>
          <p>
            <strong>FG%:</strong> {players.careerStats.FG}
          </p>
          <p>
            <strong>3FG%:</strong> {players.careerStats.FG3}
          </p>
          <p>
            <strong>FT%:</strong> {players.careerStats.FT}
          </p>
        </div>
        */
}
