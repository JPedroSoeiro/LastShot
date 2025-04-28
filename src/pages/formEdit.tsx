import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllTeams,
  getPlayerById,
  updatePlayer,
} from "../services/dataService";
import { iPlayer } from "../interfaces/iPlayer";
import { iTeam } from "../interfaces/iTeam";
import "../utils/Crud.css";
import CustomEdit from "../components/customEdit";
import "../assets/grey-9026_256.gif";

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
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true); // Estado de loading

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
    if (!validate()) return; // Se houver erro, não submete o formulário

    setIsLoading(true); // Ativa o loading

    // Aguarda 2 segundos para simular o carregamento
    setTimeout(async () => {
      if (id) {
        await updatePlayer(Number(id), player);
        setIsLoading(false); // Desativa o loading
        navigate("/jogadores"); // Redireciona para a página de jogadores
      }
    }, 2000); // Espera 2 segundos
  };

  return (
    <>
      <h1>Editar Jogador</h1>
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
          onChange={handleChange}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}

        <h3>Idade</h3>
        <CustomEdit
          type="number"
          name="age"
          placeholder="Idade"
          value={player.age}
          onChange={handleChange}
        />
        {errors.age && <div className="error-message">{errors.age}</div>}

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
        )}

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
        {errors.team && <div className="error-message">{errors.team}</div>}

        <h3>Insira um link para a foto do jogador</h3>
        <CustomEdit
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={player.image || ""}
          onChange={handleChange}
        />
        {errors.image && <div className="error-message">{errors.image}</div>}

        <button type="submit">
          {isLoading ? (
            <img
              src="/assets/grey-9026_256.gif"
              alt="logo"
              width="150"
              height="150"
            />
          ) : (
            "Salvar alterações"
          )}
        </button>
      </form>
    </>
  );
}

export default FormEdit;
