import React, { createContext, useState } from "react";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : [];
  });
  const [showTasks, setShowTasks] = useState();
  const addProject = (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };
  const addTaskToProject = (projectId, taskName, hours) => {
    const task = {
      taskName: taskName,
      hours: hours,
    };
    const updatedProjects = projects.map((project) => {
      if (project.uid === projectId) {
        return {
          ...project,
          tasks: [...project.tasks, task],
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };
  const value = {
    projects,
    addProject,
    showTasks,
    setShowTasks,
    addTaskToProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };
