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
  onPlayerUpdate: (updatedPlayer: Player) => void;
  onPlayerDelete: (id: number) => void; // NOVO
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  players,
  teamLogo,
  onPlayerUpdate,
  onPlayerDelete,
}) => {
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

        <div className="botoes">
          <button>
            <a
              href={`/jogadores/${players.id}`}
              onClick={() => onPlayerUpdate(players)}
            >
              Editar
            </a>
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Tem certeza que quer deletar este jogador?")
              ) {
                onPlayerDelete(players.id);
              }
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
