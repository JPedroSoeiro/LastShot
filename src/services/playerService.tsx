import { supabase } from "./supabaseClient";
import { iPlayer } from "../interfaces/iPlayer";

// Função para buscar todos os jogadores
export const getAllPlayers = async (): Promise<iPlayer[]> => {
  const { data, error } = await supabase.from("players").select("*");
  if (error) {
    console.error("Erro ao buscar jogadores:", error);
    return [];
  }
  return data;
};

// Função para buscar um jogador específico pelo ID
export const getPlayerById = async (id: number): Promise<iPlayer | null> => {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Erro ao buscar jogador:", error);
    return null;
  }
  return data;
};

// Função para atualizar os dados de um jogador existente
export const updatePlayer = async (
  id: number,
  updatedData: Partial<iPlayer>
) => {
  const { error } = await supabase
    .from("players")
    .update(updatedData)
    .eq("id", id);
  if (error) {
    console.error("Erro ao atualizar jogador:", error);
  }
};

// Função para inserir um novo jogador
export const insertPlayer = async (newPlayer: Omit<iPlayer, "id">) => {
  const { error } = await supabase.from("players").insert([newPlayer]);
  if (error) {
    console.error("Erro ao inserir jogador:", error);
  }
};

// Função para excluir um jogador pelo ID
export const deletePlayerById = async (id: number) => {
  const { error } = await supabase.from("players").delete().eq("id", id);
  if (error) {
    console.error("Erro ao excluir jogador:", error);
  }
};
