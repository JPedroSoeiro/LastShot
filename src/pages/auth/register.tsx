import "../../style/auth.css";
import CustomEdit from "../../components/customEdit";
import lastShotLogo from "../../assets/lastShotLogo.png";

const Register: React.FC = () => {
  return (
    <>
      <form className="cardInput">
        <img src={lastShotLogo} alt="logo" width="150" height="150" />
        <h1>Register</h1>
        <div>
          <h3>Nome</h3>
          <CustomEdit
            type="text"
            name="username"
            placeholder="Insira seu nome"
          />
          <h3>Email</h3>
          <CustomEdit
            type="text"
            name="email"
            placeholder="Insira o seu email"
          />
          <h3>Senha</h3>
          <CustomEdit
            type="text"
            name="password"
            placeholder="Insira uma senha"
          />
        </div>
        <button>Cadastrar-se</button>
      </form>
    </>
  );
};
export default Register;
