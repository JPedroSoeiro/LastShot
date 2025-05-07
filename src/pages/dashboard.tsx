import React, { useState, useEffect } from "react";
import api from "../services/api"; // Certifique-se de que o Axios está configurado corretamente
import "../style/Dashboard.css";

const Dashboard: React.FC = () => {
  const [quantidadePlayers, setQuantidadePlayers] = useState<number | null>(
    null
  );
  const [quantidadeTeams, setQuantidadeTeams] = useState<number | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Acessando o endpoint correto que já fornece as contagens de jogadores e times
        const resposta = await api.get("/dashboard");

        // Verificar se a resposta contém os dados esperados
        if (
          resposta.data &&
          resposta.data.players !== undefined &&
          resposta.data.teams !== undefined
        ) {
          const dados = resposta.data;

          // Atualizando os estados com os dados retornados
          setQuantidadePlayers(dados.players);
          setQuantidadeTeams(dados.teams);
        } else {
          console.error("Dados inválidos recebidos:", resposta.data);
        }
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
