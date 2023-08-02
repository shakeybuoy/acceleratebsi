import React, { useContext, useState } from "react";
import { ProjectContext } from "../contexts/AppContext";
export default function ProjListComponent({ project }) {
  const { setShowTasks, projects } = useContext(ProjectContext);
  const handleList = (project) => {
    setShowTasks(project);
  };
  return (
    <>
      <div
        onClick={() => handleList(project)}
        className="my-2 bg-gray-800 p-5 cursor-pointer flex justify-between items-center rounded-md shadow"
      >
        <h4 className="text-xl">{project.projNameValue}</h4>
        {projects.map((pj, index) => {
          let totalHours = 0;
          const tasks = pj.tasks;

          tasks.forEach((task) => {
            totalHours += parseFloat(task.hours);
          });

          if (project.uid == pj.uid) {
            return <h5> {totalHours.toFixed(2)} hours</h5>;
          }
        })}
      </div>
    </>
  );
}
