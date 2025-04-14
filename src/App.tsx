import React, { useEffect, useState } from "react";
import Header from "./utils/Header";
import LeftSidebar from "./utils/LeftSidebar";
import "./App.css";
import axios from "axios";

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

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/teams")
      .then((response) => {
        console.log(response.data);
        setTeams(response.data.teams.teams);
      })
      .catch((error) => {
        console.error("Erro ao buscar os times:", error);
        setTeams([]);
      });
  }, []);

  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-layout">
        <LeftSidebar teams={teams} onTeamSelect={setSelectedTeam} />{" "}
        <main className="main-content">
          {selectedTeam ? (
            <div className="teamsCard">
              <img
                src={selectedTeam.logo}
                alt={`${selectedTeam.nome} logo`}
                width="100"
              />
              <h1>{selectedTeam.nome}</h1>
              <p>
                <strong>Cidade:</strong> {selectedTeam.cidade}
              </p>
              <p>
                <strong>Sigla:</strong> {selectedTeam.sigla}
              </p>
              <p>
                <strong>Ano de Fundação:</strong> {selectedTeam.ano_fundacao}
              </p>
              <p>
                <strong>Arena:</strong> {selectedTeam.arena}
              </p>
              <p>
                <strong>Títulos:</strong>
              </p>
              <ul>
                <li>NBA: {selectedTeam.titulos.NBA}</li>
                <li>Conferências: {selectedTeam.titulos.Conferencias}</li>
                <li>Divisões: {selectedTeam.titulos.Divisoes}</li>
              </ul>
              <p>
                <strong>Principais Jogadores:</strong>
              </p>
              <ul>
                {selectedTeam.principais_jogadores.map((jogador, index) => (
                  <li key={index}>{jogador}</li>
                ))}
              </ul>
            </div>
          ) : (
            <h2>Selecione um time para ver os detalhes.</h2>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
