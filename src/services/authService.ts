import { iRegister } from "@/interfaces/iRegister";
import api from "../lib/api";

export const loginService = async (email: string, password: string) => {
  try {
    delete api.defaults.headers.common["Authorization"];

    const response = await api.post("/login", { email, password });
    const { token, user } = response.data;

    // Salva no localStorage
    localStorage.setItem("token", token);

    // Configura o axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return {
      success: true,
      token,
      user,
    };
  } catch (error: any) {
    console.error("Erro ao fazer login:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Erro desconhecido",
    };
  }
};

export const createUser = async (newUser: iRegister) => {
  try {
    await api.post("/users", newUser);
  } catch (error) {
    console.error("Erro ao inserir user:", error);
    throw error;
  }
};

export const getWithToken = async (endpoint: string, token: string) => {
  try {
    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Erro ao fazer requisição com token:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Erro desconhecido",
    };
  }
};
