import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../../layout/MainLayout";

const ProtectedLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
