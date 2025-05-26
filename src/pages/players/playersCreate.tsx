import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertPlayer } from "../../services/playerService";
import { getAllTeams } from "../../services/teamService";

import { iPlayer } from "../../interfaces/iPlayer";
import { iTeam } from "../../interfaces/iTeam";
import "../../style/Crud.css";
import CustomEdit from "../../components/customEdit";

function playersCreate() {
  const navigate = useNavigate();

  const [player, setPlayer] = useState<Omit<iPlayer, "id">>({
    name: "",
    age: 0,
    position: "",
    team: "",
    image: "",
  });

  const [teams, setTeams] = useState<iTeam[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

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

  const validate = () => {
    const newErrors: any = {};

    if (player.name.length <= 3)
      newErrors.name = "O nome precisa ter mais de 3 caracteres.";
    if (player.age <= 17) newErrors.age = "A idade precisa ser acima de 17.";
    if (!player.position) newErrors.position = "Selecione uma posição.";
    if (!player.team) newErrors.team = "Selecione um time.";
    if (!player.image)
      newErrors.image = "É necessário fornecer um link para a imagem.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(async () => {
      await insertPlayer(player);
      setIsLoading(false);
      navigate("/jogadores");
    }, 4000);
  };

  return (
    <>
      <h1>Adicionar Novo Jogador</h1>
      <hr />
      <button className="returnButton">
        <a href={`/jogadores`}>Voltar</a>
      </button>
      <form onSubmit={handleSubmit} className="editForm">
        <h3>Nome</h3>
        <CustomEdit
          type="text"
          name="name"
          placeholder="Nome"
          value={player.name}
          onChange={handleChange} // Atualiza o valor do nome
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <h3>Idade</h3>
        <CustomEdit
          type="number"
          name="age"
          placeholder="Idade"
          value={player.age}
          onChange={handleChange} // Atualiza o valor da idade
        />
        {errors.age && <div className="error-message">{errors.age}</div>}{" "}
        <h3>Posição</h3>
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
        {errors.position && (
          <div className="error-message">{errors.position}</div>
        )}{" "}
        <h3>Times</h3>
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
        {errors.team && <div className="error-message">{errors.team}</div>}{" "}
        <h3>Insira um link para a foto do jogador</h3>
        <CustomEdit
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={player.image || ""}
          onChange={handleChange}
        />
        {errors.image && <div className="error-message">{errors.image}</div>}{" "}
        <button type="submit">
          {isLoading ? (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="20"
              height="20"
            />
          ) : (
            "Adicionar Jogador"
          )}{" "}
        </button>
      </form>
    </>
  );
}

export default playersCreate;
