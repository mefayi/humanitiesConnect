import React, { useState, useEffect } from "react";

function EditProjectModal({ isOpen, onClose, project, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setLink(project.link);
    }
  }, [project]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setLink("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    const updatedProject = {
      id: project.id,
      name: name,
      description: description,
      link: link,
    };
    await onSubmit(updatedProject);
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
        <h2>Projekt bearbeiten</h2>
        <div className="form-group">
          <div className="form">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2.5 rounded-md "
              autoFocus
            />
          </div>
          <div className="form">
            <label>Bezeichnung</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bezeichnung"
              className="p-2.5 rounded-md"
            />
          </div>
          <div className="form">
            <label>URL</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="www.example.com"
              className="p-2.5 rounded-md "
            />
          </div>
        </div>
        <div className="btn-control">
          <button className="bg-white hover:bg-gray-200" onClick={handleSubmit}>Speichern</button>
          <button className="bg-white hover:bg-gray-200" onClick={handleClose}>Abbrechen</button>
        </div>
      </div>
    </div>
  );
}

export default EditProjectModal;
