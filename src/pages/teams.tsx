import React, { useEffect, useState } from "react";
import "../App.css";
import TeamCard from "../components/teamsCard";
import { getAllTeams } from "../services/teamService";

interface Team {
  id: number;
  nome: string;
  cidade: string;
  sigla: string;
  ano_fundacao: number;
  arena: string;
  titulos: {
    NBA: number;
    Conferencias: number;
    Divisoes: number;
  };
  principais_jogadores: string[];
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getAllTeams()
      .then((response) => {
        setTeams(response.data.teams);
      })
      .catch((error) => {
        console.error("Erro ao buscar os times:", error);
      });
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <form
        className="buscador"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="search">
          <input
            type="text"
            placeholder="Escolha ou pesquise um time"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <div className="cards">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => <TeamCard key={team.id} team={team} />)
        ) : (
          <h2>Nenhum time encontrado.</h2>
        )}
      </div>
    </>
  );
};

export default Teams;
