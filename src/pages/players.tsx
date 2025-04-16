import "../App.css";
import React, { useEffect, useState } from "react";
import PlayerCard from "../components/playersCard";
import { getAllPlayers } from "../services/teamService";

interface Player {
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

const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getAllPlayers()
      .then((response) => {
        setPlayers(response.data.players);
      })
      .catch((error) => {
        console.error("Erro ao buscar os times:", error);
      });
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            placeholder="Escolha ou pesquise um jogador"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </form>

      <div className="cards">
        {currentPlayers.length > 0 ? (
          currentPlayers.map((player) => (
            <PlayerCard key={player.id} players={player} />
          ))
        ) : (
          <h2>Nenhum jogador encontrado.</h2>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {currentPage > 3 && (
            <>
              <button onClick={() => handlePageChange(1)}>1</button>
              {currentPage > 4 && <span>...</span>}
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span>...</span>}
              <button onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      )}
    </>
  );
};

export default Players;
