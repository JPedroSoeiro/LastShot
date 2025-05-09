import { createContext, useState, useContext, ReactNode } from "react";

// Tipando os dados do usuário
interface User {
  id: string;
  name: string;
  email: string;
  token: string; // Caso você use um token de autenticação
}

// Tipando o contexto
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Criando o contexto com o tipo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente Provedor de Autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData); // Salva os dados do usuário após login
  };

  const logout = () => {
    setUser(null); // Remove os dados do usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto em outros componentes
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
