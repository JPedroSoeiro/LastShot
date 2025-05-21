import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import api from "../lib/api";
import { loginService, getWithToken } from "../services/authService";

interface User {
  id: string;
  username: string;
  email: string;
  login_count: number;
  last_login: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyToken: () => Promise<boolean>; // Retornando um booleano
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      logout();
      return false; // Token não encontrado
    }

    try {
      const result = await getWithToken("/verify-token", storedToken);

      if (result.success && result.data?.user) {
        setToken(storedToken);
        setUser(result.data.user);
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        return true; // Token válido
      } else {
        logout();
        return false; // Token inválido
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      logout();
      return false; // Erro ao verificar token
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await loginService(email, password);
      if (result.success) {
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem("token", result.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${result.token}`;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
