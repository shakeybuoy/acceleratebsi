import React, { useContext, useRef } from "react";
import { ProjectContext } from "../contexts/AppContext";

export default function Tasks() {
  const taskName = useRef();
  const hours = useRef();
  const { setShowTasks, projects, showTasks, addTaskToProject } =
    useContext(ProjectContext);
  //
  //
  const handleTasksAdd = (project) => {
    if (project.projNameValue.trim() !== "") {
      addTaskToProject(
        project.uid,
        taskName.current.value,
        hours.current.value
      );
    }
    taskName.current.value = "";
    hours.current.value = "";
  };
  return (
    <div className="relative my-7 bg-gray-800 p-5 rounded-md shadow">
      <button
        type="button"
        onClick={() => setShowTasks("")}
        className="absolute -top-10 right-0 bg-white text-black px-2 py-1 font-bold"
      >
        Close
      </button>
      <h4 className="text-2xl mb-2">Tasks for {showTasks.projNameValue}</h4>

      <div className="text-sm space-x-2 my-5">
        <input
          ref={taskName}
          type="text"
          className="bg-transparent border p-2"
          placeholder="Name of Task"
        />
        <input
          ref={hours}
          type="text"
          placeholder="Time Taken in Hours"
          className="bg-transparent border p-2"
        />
        <button
          onClick={() => handleTasksAdd(showTasks)}
          type="button"
          className="border p-2"
        >
          New Task
        </button>
      </div>

      {projects.map((project, index) => {
        if (project.uid === showTasks.uid) {
          return (
            <div key={index}>
              {project.tasks.map((task, index) => (
                <div
                  className="text-xl my-2 flex justify-between items-center flex-wrap"
                  key={index}
                >
                  <h5>{task.taskName}</h5>
                  <h5>{task.hours} hours</h5>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
