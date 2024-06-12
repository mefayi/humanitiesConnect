import React, { useState } from "react";

function AddProjectModal({ isOpen, onClose, onSubmit, checkers }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [checkerName, setCheckerName] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setLink("");
    setCheckerName("");
  };

  const handleSubmit = async () => {
    const projectData = {
      name: name,
      description: description,
      link: link,
      checkerName: checkerName,
    };
    await onSubmit(projectData);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal large">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Projekt hinzufügen</h2>
        <div className="form-group">
          <div className="form">
            <label>Name</label>
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2.5 rounded-md"
              rows="2"
              autoFocus
            />
          </div>
          <div className="form">
            <label>Bezeichnung</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bezeichnung"
              className="p-2.5 rounded-md"
              rows="5"
            />
          </div>
          <div className="form">
            <label>URL</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="www.example.com"
              className="p-2.5 rounded-md"
            />
          </div>
          <div className="form">
            <label>Status</label>
            <select
              value={checkerName}
              onChange={(e) => setCheckerName(e.target.value)}
              className="p-2.5 rounded-md"
            >
              <option value="">Select Checker</option>
              {checkers.map((checker) => (
                <option key={checker.name} value={checker.name}>
                  {checker.name}
                </option>
              ))}
            </select>
          </div>
          <div className="btn-control">
            <button
              className="bg-white hover:bg-gray-200"
              onClick={handleSubmit}
            >
              Hinzufügen
            </button>
            <button
              className="bg-white hover:bg-gray-200"
              onClick={handleClose}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
