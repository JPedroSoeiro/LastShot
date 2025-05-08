import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertTeam } from "../../services/teamService"; // Função para inserir time no Supabase
import { iTeam } from "../../interfaces/iTeam"; // Interface do time
import "../../style/Crud.css";
import CustomEdit from "../../components/customEdit";

function TeamsCreate() {
  const navigate = useNavigate();

  const [team, setTeam] = useState<Omit<iTeam, "id">>({
    nome: "",
    cidade: "",
    sigla: "",
    ano_fundacao: 0,
    arena: "",
    logo: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Controle de carregamento
  const [errors, setErrors] = useState<any>({}); // Armazenamento de erros de validação

  // Função para lidar com mudanças no formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTeam((prev) => ({
      ...prev,
      [name]: name === "ano_funcacao" ? Number(value) : value,
    }));
  };

  // Função para validar os dados do time
  const validate = () => {
    const newErrors: any = {};
    if (team.nome.length <= 3)
      newErrors.nome = "O nome do time precisa ter mais de 3 caracteres.";
    if (team.cidade.length <= 3)
      newErrors.cidade = "O nome da cidade precisa ter mais de 3 caracteres.";
    if (team.sigla.length !== 3)
      newErrors.sigla = "A sigla do time precisa ter exatamente 3 caracteres.";
    if (team.ano_fundacao <= 1850)
      newErrors.ano_funcacao = "Ano de fundação inválido.";
    if (!team.arena) newErrors.arena = "Insira o nome da arena.";
    if (!team.logo) newErrors.logo = "Insira um link para o logo.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para submeter o formulário e enviar os dados para o backend (Supabase)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      // Chama a função do serviço para inserir o time no Supabase
      await insertTeam(team);
      setIsLoading(false);
      navigate("/times"); // Navega para a página de times após a inserção bem-sucedida
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao inserir time:", error); // Aqui você pode exibir o erro para o usuário, se necessário
    }
  };

  return (
    <>
      <h1>Adicionar Novo Time</h1>
      <hr />
      <button className="returnButton">
        <a href="/times">Voltar</a>
      </button>
      <form onSubmit={handleSubmit} className="editForm">
        <h3>Nome do Time</h3>
        <CustomEdit
          type="text"
          name="nome"
          placeholder="Nome do time"
          value={team.nome}
          onChange={handleChange}
        />
        {errors.nome && <div className="error-message">{errors.nome}</div>}

        <h3>Cidade</h3>
        <CustomEdit
          type="text"
          name="cidade"
          placeholder="Nome da cidade"
          value={team.cidade}
          onChange={handleChange}
        />
        {errors.cidade && <div className="error-message">{errors.cidade}</div>}

        <h3>Sigla do Time</h3>
        <CustomEdit
          type="text"
          name="sigla"
          placeholder="Sigla do time"
          value={team.sigla}
          onChange={handleChange}
        />
        {errors.sigla && <div className="error-message">{errors.sigla}</div>}

        <h3>Ano de Fundação</h3>
        <CustomEdit
          type="number"
          name="ano_fundacao"
          placeholder="Ano de fundação"
          value={team.ano_fundacao}
          onChange={handleChange}
        />
        {errors.ano_funcacao && (
          <div className="error-message">{errors.ano_fundacao}</div>
        )}

        <h3>Nome da Arena</h3>
        <CustomEdit
          type="text"
          name="arena"
          placeholder="Nome da arena"
          value={team.arena}
          onChange={handleChange}
        />
        {errors.arena && <div className="error-message">{errors.arena}</div>}

        <h3>Link do Logo</h3>
        <CustomEdit
          type="text"
          name="logo"
          placeholder="Link da logo do time"
          value={team.logo}
          onChange={handleChange}
        />
        {errors.logo && <div className="error-message">{errors.logo}</div>}

        <button type="submit">
          {isLoading ? (
            <img
              src="https://i.gifer.com/ZNeT.gif"
              alt="gif"
              width="20"
              height="20"
            />
          ) : (
            "Adicionar Time"
          )}
        </button>
      </form>
    </>
  );
}

export default TeamsCreate;
