import { iTeam } from "../interfaces/iTeam";
import api from "../lib/api"; // Importando a instância do axios configurada

// Função para buscar todos os times
export const getAllTeams = async (): Promise<iTeam[]> => {
  try {
    const response = await api.get("/teams"); // Fazendo a requisição GET para o backend
    return response.data; // Retorna os dados dos times
  } catch (error) {
    console.error("Erro ao buscar times:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

// Função para buscar um time específico pelo ID
export const getTeamById = async (id: number): Promise<iTeam | null> => {
  try {
    const response = await api.get(`/teams/${id}`); // Fazendo a requisição GET para o backend
    return response.data; // Retorna os dados do time
  } catch (error) {
    console.error("Erro ao buscar time:", error);
    return null; // Retorna null em caso de erro
  }
};

// Função para atualizar os dados de um time existente
export const updateTeam = async (id: number, updatedData: Partial<iTeam>) => {
  try {
    await api.put(`/teams/${id}`, updatedData); // Fazendo a requisição PUT para o backend
  } catch (error) {
    console.error("Erro ao atualizar time:", error);
  }
};

// Função para inserir um novo time
export const insertTeam = async (newTeam: Omit<iTeam, "id">) => {
  try {
    await api.post("/teams", newTeam); // Fazendo a requisição POST para o backend
  } catch (error) {
    console.error("Erro ao inserir time:", error);
  }
};

// Função para excluir um time pelo ID
export const deleteTeamById = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/teams/${id}`); // Fazendo a requisição DELETE para o backend
    return true; // Retorna true se a exclusão for bem-sucedida
  } catch (error) {
    console.error("Erro ao excluir time:", error);
    return false; // Retorna false em caso de erro
  }
};
