import React from "react";
import "../style/teamsCard.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteTeamById } from "../services/teamService";

interface Team {
  id: number;
  nome: string;
  cidade: string;
  sigla: string;
  ano_fundacao: number;
  arena: string;
  logo?: string;
}

interface TeamCardProps {
  team: Team;
  onTeamDelete: (id: number) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onTeamDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/times/${team.id}`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que quer deletar este time?"
    );
    if (confirmDelete) {
      const success = await deleteTeamById(team.id);
      if (success) {
        onTeamDelete(team.id);
      } else {
        alert("Erro ao deletar o time. Tente novamente.");
      }
    }
  };

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
      <div className="botoes">
        <button onClick={handleEditClick}>
          <FaEdit />
        </button>
        <button onClick={handleDeleteClick}>
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
