import { supabase } from "./supabaseClient";
import { iTeam } from "../interfaces/iTeam";

// Função para buscar todos os times
export const getAllTeams = async (): Promise<iTeam[]> => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) {
    console.error("Erro ao buscar times:", error);
    return [];
  }
  return data;
};

// Função para buscar um time específico pelo ID
export const getTeamById = async (id: number): Promise<iTeam | null> => {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Erro ao buscar time:", error);
    return null;
  }
  return data;
};

// Função para atualizar os dados de um time existente
export const updateTeam = async (id: number, updatedData: Partial<iTeam>) => {
  const { error } = await supabase
    .from("teams")
    .update(updatedData)
    .eq("id", id);
  if (error) {
    console.error("Erro ao atualizar time:", error);
  }
};

// Função para inserir um novo time
export const insertTeam = async (newTeam: Omit<iTeam, "id">) => {
  const { error } = await supabase.from("teams").insert([newTeam]);
  if (error) {
    console.error("Erro ao inserir time:", error);
  }
};

// Função para excluir um time pelo ID
export const deleteTeamById = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("teams").delete().eq("id", id);
  if (error) {
    console.error("Erro ao excluir time:", error);
    return false; // Retorna false em caso de erro
  }
  return true; // Retorna true se a exclusão foi bem-sucedida
};
