import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard";
import Teams from "./pages/teams/teams";
import Players from "./pages/players/players";
import PlayersEdit from "./pages/players/playersEdit";
import PlayersCreate from "./pages/players/playersCreate";
import TeamsCreate from "./pages/teams/teamsCreate";
import TeamsEdit from "./pages/teams/teamsEdit";
import Login from "./pages/auth/login.tsx";
import Register from "./pages/auth/register.tsx";
import AuthLayout from "./layout/AuthLayout";
import { AuthProvider } from "./context/AuthContext.tsx";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jogadores" element={<Players />} />
          <Route path="jogadores/create" element={<PlayersCreate />} />
          <Route path="jogadores/:id" element={<PlayersEdit />} />
          <Route path="times" element={<Teams />} />
          <Route path="times/create" element={<TeamsCreate />} />
          <Route path="times/:id" element={<TeamsEdit />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
