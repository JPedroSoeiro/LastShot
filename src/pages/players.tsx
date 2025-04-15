import "../App.css";
import React, { useEffect, useState } from "react";
import PlayerCard from "../components/playersCard";
import { getAllPlayers } from "../services/teamService";

const Players: React.FC = () => {
  const [players, setPlayers] = useState<[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getAllPlayers()
      .then((response) => {
        setPlayers(response.data.players);
      })
      .catch((error) => {
        console.error("Erro ao buscar os times:", error);
      });
  }, []);

  const filteredPlayers: Player[] = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Escolha ou pesquise um jogador"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
      <div className="cards">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((players) => (
            <PlayerCard key={players.id} players={players} />
          ))
        ) : (
          <h2>Nenhum jogador encontrado.</h2>
        )}
      </div>
    </>
  );
};

export default Players;
