import React, { useContext, useRef } from "react";
import { ProjectContext } from "../contexts/AppContext";
import ProjListComponent from "./ProjListComponent";
import Tasks from "./Tasks";
import { v4 as uuidv4 } from "uuid";

export default function CreateProject() {
  const projName = useRef();
  const { addProject, projects, showTasks } = useContext(ProjectContext);

  const handleAddProject = () => {
    const value = {
      projNameValue: projName.current.value,
      tasks: [],
      uid: uuidv4(),
    };
    addProject(value);
    projName.current.value = "";
  };
  return (
    <>
      <section className="my-10 p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Projects</h1>
          <div className="text-sm space-x-2">
            <input
              ref={projName}
              type="text"
              className="bg-transparent border p-2"
            />
            <button
              onClick={handleAddProject}
              type="button"
              className="p-2 border"
            >
              ADD PROJECT
            </button>
          </div>
        </div>
      </section>
      {/* List of projects */}
      <section className="grid grid-cols-2 gap-10 p-5">
        <div className="my-5 max-w-md">
          {projects.map((project, index) => {
            return <ProjListComponent project={project} key={index} />;
          })}
        </div>
        {showTasks ? <Tasks /> : <></>}
      </section>
    </>
  );
}
