import { supabase } from "../services/supabaseClient";
import "../interfaces/iPlayer";

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

export const createPlayer = async (playerData: iPlayer) => {
  const response = await fetch("http://localhost:3000/api/players", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerData),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar jogador!");
  }

  return response.json();
};
