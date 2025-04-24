import React from "react";
import { iTeam } from "../interfaces/iTeam";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: iTeam[];
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  isOpen,
  onClose,
  teams,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Jogador</h2>
        <form>
          <input type="text" placeholder="ID" name="id" />
          <input type="text" placeholder="Nome" name="name" />
          <input type="number" placeholder="Idade" name="age" />
          <input type="text" placeholder="Posição" name="position" />
          <select name="team">
            <option value="">Selecione um time</option>
            {teams.map((team) => (
              <option key={team.id} value={team.nome}>
                {team.nome}
              </option>
            ))}
          </select>
          <input type="text" placeholder="URL da imagem" name="image" />
          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerModal;
import "./playerModal.css";
