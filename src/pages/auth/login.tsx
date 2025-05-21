import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import CustomEdit from "../../components/customEdit";
import { useNavigate } from "react-router-dom";
import lastShotLogo from "../../assets/lastShotLogo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      alert("Erro ao realizar o login.");
      console.error(error);
    }
  };

  return (
    <form className="cardInput" onSubmit={handleLogin}>
      <img src={lastShotLogo} alt="logo" width="150" height="150" />
      <h1>Login</h1>
      <div>
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
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <img
            src="https://i.gifer.com/ZNeT.gif"
            alt="Carregando..."
            width="20"
            height="20"
          />
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
};

export default Login;
