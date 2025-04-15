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
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Players;
