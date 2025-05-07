import React, { useEffect, useState } from "react";
import PlayerCard from "../components/playersCard";
import {
  getAllPlayers,
  updatePlayer,
  deletePlayerById,
} from "../services/playerService";
import { getAllTeams } from "../services/teamService";

import { iPlayer } from "../interfaces/iPlayer";
import { iTeam } from "../interfaces/iTeam";

const Players: React.FC = () => {
  const [players, setPlayers] = useState<iPlayer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [teams, setTeams] = useState<iTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const itemsPerPage = 8;

  useEffect(() => {
    const loadPlayers = async () => {
      const data = await getAllPlayers();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setPlayers(sortedData);
    };
    loadPlayers();
  }, []);

  useEffect(() => {
    const loadTeams = async () => {
      const data = await getAllTeams();
      setTeams(data);
    };
    loadTeams();
  }, []);

  const filteredPlayers = players.filter((player) => {
    const nameMatch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const selectedTeamName = selectedTeam
      ? teams.find((team) => String(team.id) === selectedTeam)?.nome
      : null;
    const teamMatch = selectedTeam ? player.team === selectedTeamName : true;
    return nameMatch && teamMatch;
  });

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

  const onPlayerUpdate = async (updatedPlayer: iPlayer) => {
    await updatePlayer(updatedPlayer.id, updatedPlayer);

    setPlayers((prevPlayers) =>
      [
        ...prevPlayers.map((player) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        ),
      ].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const onPlayerDelete = async (id: number) => {
    await deletePlayerById(id);

    setPlayers((prevPlayers) =>
      prevPlayers
        .filter((player) => player.id !== id)
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  return (
    <>
      <div>
        <h1 className="title">Jogadores da NBA</h1>
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
            placeholder="Escolha ou pesquise um jogador"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </form>

      <div className="second-line">
        <div className="filtros">
          <select
            value={selectedTeam}
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Todos os times</option>
            {teams.map((team) => (
              <option key={team.id} value={String(team.id)}>
                {team.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="adicionar-jogador-container">
          <button className="adicionar-jogador-btn">
            <a href={`/jogadores/create`}>Adicionar Jogador</a>
          </button>
        </div>
      </div>

      <div className="cards">
        {currentPlayers.length > 0 ? (
          currentPlayers.map((player) => {
            const matchedTeam = teams.find((team) => team.nome === player.team);
            const teamLogo = matchedTeam?.logo || "";
            return (
              <PlayerCard
                key={player.id}
                players={player}
                teamLogo={teamLogo}
                onPlayerUpdate={onPlayerUpdate}
                onPlayerDelete={onPlayerDelete} // Passando a função de exclusão
              />
            );
          })
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
