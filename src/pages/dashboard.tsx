import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../style/Dashboard.css";

const Dashboard: React.FC = () => {
  const [quantidadePlayers, setQuantidadePlayers] = useState(null);
  const [quantidadeTeams, setQuantidadeTeams] = useState<number | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const respostaJogadores = await api.get("/jogadores");
        const dadosJogadores = respostaJogadores.data;
        const quantidadeJogadores = dadosJogadores.length;
        setQuantidadePlayers(quantidadeJogadores);

        const respostaTimes = await api.get("/times");
        const dadosTimes = respostaTimes.data;
        const quantidadeTimes = dadosTimes.length;
        setQuantidadeTeams(quantidadeTimes);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    buscarDados();
  }, []);

  return (
    <div className="totals">
      <h1>Quantidade de;</h1>
      <div className="card">
        <div>
          <h2>Jogadores:</h2>
          {quantidadePlayers !== null ? (
            <p>{quantidadePlayers}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="30"
              height="30"
            />
          )}
        </div>
        <div>
          <h2>Times:</h2>
          {quantidadeTeams !== null ? (
            <p>{quantidadeTeams}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="30"
              height="30"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
