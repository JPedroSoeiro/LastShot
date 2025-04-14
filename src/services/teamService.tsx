import api from "./api";

export const getAllTeams = () => {
  return api.get("/teams");
};
