import api from "./api";

export const getAllTeams = () => {
  return api.get("/teams");
};

export const getAllPlayers = () => {
  return api.get("/players");
};
