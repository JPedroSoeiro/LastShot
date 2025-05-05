import "../style/Crud.css";
import CustomEdit from "../components/customEdit";

function teamsCreate() {
  return (
    <>
      <h1>Adicionar novo time</h1>
      <hr />
      <button className="returnButton">
        <a href={`/times`}>Voltar</a>
      </button>
      <form className="editForm">
        <h3>Nome do time</h3>
        <CustomEdit type="text" name="name" placeholder="Nome do time" />
        <h3>Nome da cidade</h3>
        <CustomEdit type="text" name="name" placeholder="Nome da cidade" />
        <h3>Sigla do time</h3>
        <CustomEdit type="text" name="name" placeholder="Sigla do time" />
        <h3>Ano de fundação do time</h3>
        <CustomEdit
          type="number"
          name="name"
          placeholder="Ano de fundação do time"
        />
        <h3>Nome da arena</h3>
        <CustomEdit type="text" name="name" placeholder="Nome da arena" />
        <h3>Link da logo do time</h3>
        <CustomEdit
          type="text"
          name="name"
          placeholder="Link da logo do time"
        />
      </form>
    </>
  );
}

export default teamsCreate;
