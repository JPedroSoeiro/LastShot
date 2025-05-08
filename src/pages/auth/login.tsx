import "../../style/auth.css";
import CustomEdit from "../../components/customEdit";
import lastShotLogo from "../../assets/lastShotLogo.png";

const Login: React.FC = () => {
  return (
    <>
      <form className="cardInput">
        <img src={lastShotLogo} alt="logo" width="150" height="150" />
        <h1>Login</h1>
        <div>
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
        <button>
          <a href={`/dashboard`}>Entrar</a>
        </button>
      </form>
    </>
  );
};
export default Login;
