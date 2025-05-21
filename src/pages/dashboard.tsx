import { useState, useEffect } from "react";
import "../style/Dashboard.css";
import { useAuth } from "../context/AuthProvider";
import api from "../lib/api";

const Dashboard = () => {
  const { token, loading } = useAuth();
  const [quantidadePlayers, setQuantidadePlayers] = useState<number>(0);
  const [quantidadeTeams, setQuantidadeTeams] = useState<number>(0);

  useEffect(() => {
    if (loading || !token) return;

    const buscarDados = async () => {
      try {
        const resposta = await api.get("/dashboard");
        setQuantidadePlayers(resposta.data.players);
        setQuantidadeTeams(resposta.data.teams);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    buscarDados();
  }, [loading, token]); // A única dependência aqui é a inicialização dos dados do dashboard

  const { user } = useAuth();
  // Caso o usuário não esteja autenticado, redireciona para a página de login

  return (
    <div className="totals">
      <div className="column1">
        <div className="card">
          <h2>Quantidade de jogadores:</h2>
          {quantidadePlayers !== null ? (
            <p className="count">{quantidadePlayers}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="40"
              height="40"
            />
          )}
        </div>
        <div className="card">
          <h2>Quantidade de times:</h2>
          {quantidadeTeams !== null ? (
            <p className="count">{quantidadeTeams}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="40"
              height="40"
            />
          )}
        </div>
        <div className="card">
          <h2>Quantidade de vezes que o usuário realizou o login:</h2>
          {user?.login_count !== null ? (
            <p className="count">{user?.login_count}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="40"
              height="40"
            />
          )}
        </div>
      </div>
      <div className="column2">
        <div className="card">
          <h2>Última vez que realizou o login:</h2>
          {user?.last_login !== null ? (
            <p className="count">
              {new Date(String(user?.last_login)).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="40"
              height="40"
            />
          )}
        </div>
        <div className="card">
          <h2>Usuário:</h2>
          {user?.username !== null ? (
            <p className="count">{user?.username}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="40"
              height="40"
            />
          )}
        </div>
        <div className="card">
          <h2>Email:</h2>
          {user?.email !== null ? (
            <p className="count">{user?.email}</p>
          ) : (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="40"
              height="40"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
