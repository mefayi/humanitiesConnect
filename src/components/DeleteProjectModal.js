import React from "react";

function DeleteProjectModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Projekt löschen</h2>
        <p>Sind Sie sicher, dass Sie dieses Projekt löschen möchten?</p>
        <div className="form-control">
          <button onClick={onDelete} className="bg-white text-red-500 hover:bg-gray-200">Löschen</button>
          <button onClick={onClose} className="bg-white hover:bg-gray-200">Abbrechen</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
