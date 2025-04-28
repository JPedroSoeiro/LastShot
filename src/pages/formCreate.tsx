import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTeams, insertPlayer } from "../services/dataService";
import { iPlayer } from "../interfaces/iPlayer";
import { iTeam } from "../interfaces/iTeam";
import "../utils/Crud.css";
import CustomEdit from "../components/customEdit";
import "../assets/grey-9026_256.gif";

function FormCreate() {
  const navigate = useNavigate(); // Hook para navegação entre páginas

  const [player, setPlayer] = useState<Omit<iPlayer, "id">>({
    name: "",
    age: 0,
    position: "",
    team: "",
    image: "",
  });

  const [teams, setTeams] = useState<iTeam[]>([]); // Estado para armazenar os times
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de loading
  const [errors, setErrors] = useState<any>({}); // Para armazenar mensagens de erro

  // Efeito para buscar os times quando o componente for montado
  useEffect(() => {
    const fetchTeams = async () => {
      const teamData = await getAllTeams(); // Chama o serviço para buscar os times
      setTeams(teamData); // Atualiza o estado dos times
    };

    fetchTeams(); // Executa a função de busca de times
  }, []); // O array vazio faz com que essa função seja executada uma vez, no primeiro render

  // Função para atualizar os dados do jogador quando o usuário alterar um campo
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target; // Extrai o nome do campo e seu valor
    setPlayer((prev) => ({
      ...prev, // Preserva os dados anteriores
      [name]: name === "age" ? Number(value) : value, // Converte a idade para número
    }));
  };

  // Função de validação do formulário
  const validate = () => {
    const newErrors: any = {}; // Objeto para armazenar erros
    // Validações dos campos
    if (player.name.length <= 3)
      newErrors.name = "O nome precisa ter mais de 3 caracteres.";
    if (player.age <= 17) newErrors.age = "A idade precisa ser acima de 17.";
    if (!player.position) newErrors.position = "Selecione uma posição.";
    if (!player.team) newErrors.team = "Selecione um time.";
    if (!player.image)
      newErrors.image = "É necessário fornecer um link para a imagem.";
    setErrors(newErrors); // Atualiza o estado dos erros
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o envio tradicional do formulário
    if (!validate()) return; // Se houver erros, não envia o formulário

    setIsLoading(true); // Ativa o estado de carregamento

    // Aguarda 2 segundos para simular o processo de carregamento
    setTimeout(async () => {
      await insertPlayer(player); // Envia os dados do jogador
      setIsLoading(false); // Desativa o estado de carregamento
      navigate("/jogadores"); // Redireciona para a página de jogadores
    }, 4000); // Atraso de 4 segundos (2000ms)
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
        {errors.name && <div className="error-message">{errors.name}</div>}{" "}
        {/* Exibe erro se houver */}
        <h3>Idade</h3>
        <CustomEdit
          type="number"
          name="age"
          placeholder="Idade"
          value={player.age}
          onChange={handleChange} // Atualiza o valor da idade
        />
        {errors.age && <div className="error-message">{errors.age}</div>}{" "}
        {/* Exibe erro se houver */}
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
        {/* Exibe erro se houver */}
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
        {/* Exibe erro se houver */}
        <h3>Insira um link para a foto do jogador</h3>
        <CustomEdit
          type="text"
          name="image"
          placeholder="URL da imagem"
          value={player.image || ""}
          onChange={handleChange} // Atualiza o valor da imagem
        />
        {errors.image && <div className="error-message">{errors.image}</div>}{" "}
        {/* Exibe erro se houver */}
        <button type="submit">
          {isLoading ? (
            <img
              src="/assets/grey-9026_256.gif"
              alt="logo"
              width="150"
              height="150"
            />
          ) : (
            "Adicionar Jogador"
          )}{" "}
          {/* Exibe "Carregando..." enquanto o formulário está sendo enviado */}
        </button>
      </form>
    </>
  );
}

export default FormCreate;
