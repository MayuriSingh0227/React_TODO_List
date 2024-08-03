import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ tasks, setTasks, searchTerm, setSearchParams }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setSearchParams({ search: localSearchTerm });
  }, [localSearchTerm, setSearchParams]);

  const handleUpdate = (id, title, description, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title ?? task.title,
              description: description ?? task.description,
              completed: completed ?? task.completed,
              timestamp: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(localSearchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
      />
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
