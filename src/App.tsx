import React, { useState } from "react";
import Header from "../utils/Header";
import RightSidebar from "../utils/RightSidebar";
import "./App.css";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <button className="open-btn" onClick={() => setSidebarOpen(true)}>
          Abrir Sidebar
        </button>

        <div>
          <h1>oi</h1>
        </div>
      </main>

      <RightSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    </div>
  );
};

export default App;

//https://app.balldontlie.io/
