import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard";
import Teams from "./pages/teams";
import Players from "./pages/players";
import PlayersEdit from "./pages/playersEdit";
import PlayersCreate from "./pages/playersCreate";
import TeamsCreate from "./pages/teamsCreate";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="times" element={<Teams />} />
        <Route path="jogadores" element={<Players />} />
        <Route path="jogadores/create" element={<PlayersCreate />} />
        <Route path="jogadores/:id" element={<PlayersEdit />} />
        <Route path="times/create" element={<TeamsCreate />} />
      </Route>
    </Routes>
  );
};

export default App;
