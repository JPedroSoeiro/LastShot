import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { verifyToken, logout, loading } = useAuth();
  const location = useLocation();

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const tokenValid = await verifyToken();

      if (!tokenValid) {
        logout();
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    };

    checkToken();
  }, [location.pathname, verifyToken]);

  // Enquanto está verificando o token, exibe um "loading"
  if (loading || authorized === null) {
    return (
      <div>
        <img
          src="https://i.gifer.com/ZNeT.gif"
          alt="gif"
          width="40"
          height="40"
        />
      </div>
    );
  }

  // Se não estiver autorizado, redireciona para o login
  if (!authorized) {
    return <Navigate to="/" />;
  }

  // Se autorizado, exibe a rota protegida
  return <>{children}</>;
};

export default ProtectedRoute;
