import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../utils/navbar";

const AuthLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
