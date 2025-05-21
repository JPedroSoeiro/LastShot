import { iPlayer } from "../interfaces/iPlayer";
import api from "../lib/api"; // Importando a instância do axios configurada

// Função para buscar todos os jogadores
export const getAllPlayers = async (): Promise<iPlayer[]> => {
  try {
    const response = await api.get("/players"); // Requisição GET para buscar todos os jogadores
    return response.data; // Retorna os dados dos jogadores
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

// Função para buscar um jogador específico pelo ID
export const getPlayerById = async (id: number): Promise<iPlayer | null> => {
  try {
    const response = await api.get(`/players/${id}`); // Requisição GET para buscar um jogador pelo ID
    return response.data; // Retorna os dados do jogador
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    return null; // Retorna null em caso de erro
  }
};

// Função para atualizar os dados de um jogador existente
export const updatePlayer = async (
  id: number,
  updatedData: Partial<iPlayer>
) => {
  try {
    await api.put(`/players/${id}`, updatedData); // Requisição PUT para atualizar um jogador
  } catch (error) {
    console.error("Erro ao atualizar jogador:", error);
  }
};

// Função para inserir um novo jogador
export const insertPlayer = async (newPlayer: Omit<iPlayer, "id">) => {
  try {
    await api.post("/players", newPlayer); // Requisição POST para inserir um jogador
  } catch (error) {
    console.error("Erro ao inserir jogador:", error);
  }
};

// Função para excluir um jogador pelo ID
export const deletePlayerById = async (id: number) => {
  try {
    await api.delete(`/players/${id}`); // Requisição DELETE para excluir um jogador pelo ID
  } catch (error) {
    console.error("Erro ao excluir jogador:", error);
  }
};
