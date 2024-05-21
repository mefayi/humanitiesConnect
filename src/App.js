import React, { useState, useEffect } from "react";
import MainContent from "./components/MainContent";
import AddProjectModal from "./components/AddProjectModal";
import EditProjectModal from "./components/EditProjectModal";
import DeleteProjectModal from "./components/DeleteProjectModal";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchPlugins();

    const refreshListener = () => fetchProjects();
    window.api.onRefreshData(refreshListener);

    return () => {
      window.api.offRefreshData(refreshListener);
    };
  }, []);

  async function fetchProjects() {
    try {
      const response = await window.api.getData();
      setProjects(response);
    } catch (error) {
      console.error("Error loading the projects:", error);
    }
  }

  async function fetchPlugins() {
    try {
      const response = await window.api.getPlugins();
      setPlugins(response);
    } catch (error) {
      console.error("Error loading plugins:", error);
    }
  }

  async function handleAddProject(projectData) {
    try {
      const newProject = await window.api.addData(projectData);
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  }

  async function handleEditProject(projectData) {
    try {
      const updatedProject = await window.api.updateData(projectData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }

  async function handleDeleteProject() {
    try {
      const updatedProjects = projects.filter(
        (project) => project.id !== selectedProject.id
      );
      await window.api.saveData(updatedProjects);
      setDeleteModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  function handleOpenPlugin(pluginDir) {
    window.api.openPlugin(pluginDir);
  }

  return (
    <div>
      <MainContent
        onAdd={() => setAddModalOpen(true)}
        onEdit={(project) => {
          setSelectedProject(project);
          setEditModalOpen(true);
        }}
        onDelete={(project) => {
          setSelectedProject(project);
          setDeleteModalOpen(true);
        }}
        projects={projects}
        plugins={plugins}
        onOpenPlugin={handleOpenPlugin}
      />
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddProject}
      />
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={selectedProject}
        onSubmit={handleEditProject}
      />
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}

export default App;
