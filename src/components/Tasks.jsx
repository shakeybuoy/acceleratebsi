import React, { useContext, useRef, useState } from "react";
import { ProjectContext } from "../contexts/AppContext";

export default function Tasks() {
  const taskName = useRef();
  const hours = useRef();
  const [err, setErr] = useState(false);
  const { setShowTasks, projects, showTasks, addTaskToProject } =
    useContext(ProjectContext);
  const handleTasksAdd = (project) => {
    if (project.projNameValue.trim() !== "") {
      if (
        !isNaN(parseFloat(hours.current.value)) &&
        taskName.current.value.trim() !== ""
      ) {
        setErr(false);
        addTaskToProject(
          project.uid,
          taskName.current.value.trim(),
          hours.current.value
        );
        taskName.current.value = "";
        hours.current.value = "";
      } else {
        setErr(true);
      }
    }
  };
  return (
    <div className="relative bg-gray-800 p-5 rounded-md shadow">
      <button
        type="button"
        onClick={() => setShowTasks("")}
        className="absolute -top-10 right-0 rounded bg-gray-300 shadow text-black px-2 py-1 font-bold"
      >
        Close
      </button>
      <h4 className="text-3xl font-semibold mb-2">{showTasks.projNameValue}</h4>
      <div className="text-sm flex flex-wrap gap-2 my-5">
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
      {err && (
        <div className="bg-red-200 rounded-lg text-red-500 font-semibold text-center p-2">
          Please Recheck the Values
        </div>
      )}
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
