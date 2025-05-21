import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Teams from "./pages/teams/teams";
import Players from "./pages/players/players";
import PlayersEdit from "./pages/players/playersEdit";
import PlayersCreate from "./pages/players/playersCreate";
import TeamsCreate from "./pages/teams/teamsCreate";
import TeamsEdit from "./pages/teams/teamsEdit";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/login.tsx";
import AuthLayout from "./layout/AuthLayout";
import { AuthProvider } from "./context/AuthProvider.tsx";
import ProtectedLayout from "./components/protected/ProtectedLayout.tsx";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
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
