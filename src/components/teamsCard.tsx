import React from "react";
import "./teamsCard.css";

interface Team {
  id: number;
  nome: string;
  cidade: string;
  sigla: string;
  ano_fundacao: number;
  arena: string;
  logo?: string;
  titulos: {
    NBA: number;
    Conferencias: number;
    Divisoes: number;
  };
  principais_jogadores: string[];
}

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="teamsCard">
      {team.logo && (
        <img
          src={team.logo}
          alt={`${team.nome} logo`}
          width="120"
          height="120"
        />
      )}
      <div className="info">
        <h1>{team.nome}</h1>

        <p>
          <strong>Cidade:</strong> {team.cidade}
        </p>
        <p>
          <strong>Sigla:</strong> {team.sigla}
        </p>
        <p>
          <strong>Ano de Fundação:</strong> {team.ano_fundacao}
        </p>
        <p>
          <strong>Arena:</strong> {team.arena}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
