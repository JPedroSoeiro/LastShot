import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTeams, insertPlayer } from "../services/dataService";
import { iPlayer } from "../interfaces/iPlayer";
import { iTeam } from "../interfaces/iTeam";
import "../utils/Crud.css";
import CustomEdit from "../components/customEdit";

function FormCreate() {
  const navigate = useNavigate();

  const [player, setPlayer] = useState<Omit<iPlayer, "id">>({
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

    fetchTeams();
  }, []);

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

    await insertPlayer(player);
    navigate("/jogadores");
  };

  return (
    <>
      <h1>Adicionar Novo Jogador</h1>
      <hr />
      <form onSubmit={handleSubmit} className="editForm">
        <CustomEdit
          type="text"
          name="name"
          placeholder="Nome"
          value={player.name}
          onChange={handleChange}
        />
        <CustomEdit
          type="number"
          name="age"
          placeholder="Idade"
          value={player.age}
          onChange={handleChange}
        />
        <select
          name="position"
          value={player.position}
          onChange={handleChange}
          className="custom-select-field"
        >
          <option value="">Selecione a posição</option>
          <option value="Point Guard">Point Guard</option>
          <option value="Shooting Guard">Shooting Guard</option>
          <option value="Small Forward">Small Forward</option>
          <option value="Power Forward">Power Forward</option>
          <option value="Center">Center</option>
        </select>
        <select
          name="team"
          value={player.team}
          onChange={handleChange}
          className="custom-select-field"
        >
          <option value="">Selecione um time</option>
          {teams.map((team) => (
            <option key={team.id} value={team.nome}>
              {team.nome}
            </option>
          ))}
        </select>
        <CustomEdit
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={player.image || ""}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Jogador</button>
      </form>
    </>
  );
}

export default FormCreate;
