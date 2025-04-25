import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllTeams,
  getPlayerById,
  updatePlayer,
} from "../services/dataService";
import { iPlayer } from "../interfaces/iPlayer";
import { iTeam } from "../interfaces/iTeam";
import "../App.css";
import CustomInput from "../components/customInput";

function FormEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [player, setPlayer] = useState<iPlayer>({
    id: 0,
    name: "",
    age: 0,
    position: "",
    team: "",
    image: "",
  });

  const [teams, setTeams] = useState<iTeam[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamData = await getAllTeams();
      setTeams(teamData);
    };

    const fetchPlayer = async () => {
      if (id) {
        const playerData = await getPlayerById(Number(id));
        if (playerData) setPlayer(playerData);
      }
    };

    fetchTeams();
    fetchPlayer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await updatePlayer(Number(id), player);
      navigate("/jogadores");
    }
  };

  return (
    <>
      <h1>{id ? "Editar Jogador" : "Adicionar Jogador"}</h1>
      <form onSubmit={handleSubmit} className="editForm">
        <CustomInput
          type="text"
          name="name"
          placeholder="Nome"
          value={player.name}
          onChange={handleChange}
        />
        <CustomInput
          type="number"
          name="age"
          placeholder="Idade"
          value={player.age}
          onChange={handleChange}
        />
        <select name="position" value={player.position} onChange={handleChange}>
          <option value="">Selecione a posição</option>
          <option value="Point Guard">Point Guard</option>
          <option value="Shooting Guard">Shooting Guard</option>
          <option value="Small Forward">Small Forward</option>
          <option value="Power Forward">Power Forward</option>
          <option value="Center">Center</option>
        </select>
        <select name="team" value={player.team} onChange={handleChange}>
          <option value="">Selecione um time</option>
          {teams.map((team) => (
            <option key={team.id} value={team.nome}>
              {team.nome}
            </option>
          ))}
        </select>
        <CustomInput
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={player.image || ""}
          onChange={handleChange}
        />
        <button type="submit">{id ? "Salvar alterações" : "Adicionar"}</button>
      </form>
    </>
  );
}

export default FormEdit;
