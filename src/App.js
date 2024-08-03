import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import "./App.css";
import { useSearchParams } from "react-router-dom";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const handleAddTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="add-task">
        <input id="titleInput" type="text" placeholder="Task title" />
        <textarea
          id="descriptionInput"
          placeholder="Task description"
        ></textarea>
        <button
          onClick={() =>
            handleAddTask(
              document.getElementById("titleInput").value,
              document.getElementById("descriptionInput").value
            )
          }
        >
          Add Task
        </button>
      </div>
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        searchTerm={searchTerm}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default App;
