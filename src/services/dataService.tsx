import { supabase } from "../services/supabaseClient";

export const getAllTeams = async () => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) {
    console.error("Erro ao buscar times:", error);
    return [];
  }
  return data;
};

export const getAllPlayers = async () => {
  const { data, error } = await supabase.from("players").select("*");
  if (error) {
    console.error("Erro ao buscar jogadores:", error);
    return [];
  }
  return data;
};
