import React, { useEffect, useState } from "react";
import "../../App.css";
import TeamCard from "../../components/card/teamsCard";
import { getAllTeams } from "../../services/teamService";
import { iTeam } from "../../interfaces/iTeam";
import { deleteTeamById } from "../../services/teamService"; // Importe a função de exclusão

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<iTeam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const teamsPerPage = 10;

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getAllTeams();
      setTeams(data);
    };
    fetchTeams();
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

  // Função para deletar o time e atualizar a lista
  const handleTeamDelete = async (id: number) => {
    const success = await deleteTeamById(id); // Chama o serviço para deletar o time
    if (success) {
      setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id)); // Atualiza o estado
    } else {
      alert("Erro ao deletar o time. Tente novamente.");
    }
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
      <div className="adicionar-jogador-container">
        <button className="adicionar-jogador-btn">
          <a href={`/times/create`}>Adicionar time</a>
        </button>
      </div>
      <div className="cards">
        {currentTeams.length > 0 ? (
          currentTeams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onTeamDelete={handleTeamDelete}
            />
          ))
        ) : (
          <img
            src="https://i.gifer.com/ZNeT.gif"
            alt="gif"
            width="30"
            height="30"
          />
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Teams;
