import "../../style/auth.css";
import CustomEdit from "../../components/customEdit";
import lastShotLogo from "../../assets/lastShotLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/authService";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate(); // Usando o useNavigate

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newData = {
        username,
        email,
        password,
      };

      await createUser(newData);
      navigate("/"); // Redireciona após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <form className="cardInput" onSubmit={handleRegister}>
      <img src={lastShotLogo} alt="logo" width="150" height="150" />
      <h1>Cadastrar-se</h1>
      <div>
        <h3>Nome</h3>
        <CustomEdit
          type="text"
          name="username"
          placeholder="Insira seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h3>Email</h3>
        <CustomEdit
          type="email"
          name="email"
          placeholder="Insira o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3>Senha</h3>
        <CustomEdit
          type="password"
          name="password"
          placeholder="Insira uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Cadastrar-se</button>
    </form>
  );
};

export default Register;
