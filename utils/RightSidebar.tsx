import React from "react";
import "./RightSidebar.css";

interface RightSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          X
        </button>
        <h2>Sidebar Direita</h2>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </div>
    </>
  );
};

export default RightSidebar;
