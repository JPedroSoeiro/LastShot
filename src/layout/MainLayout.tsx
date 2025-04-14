import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../utils/LeftSidebar";
import "../App.css";

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <LeftSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
