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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const teamsPerPage = 10;

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

  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  const startIndex = (currentPage - 1) * teamsPerPage;
  const currentTeams = filteredTeams.slice(
    startIndex,
    startIndex + teamsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <h1 className="title">Times da NBA</h1>
      </div>
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </form>

      <div className="cards">
        {currentTeams.length > 0 ? (
          currentTeams.map((team) => <TeamCard key={team.id} team={team} />)
        ) : (
          <h2>Nenhum time encontrado.</h2>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Teams;
