import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import { v4 as uuidv4 } from "uuid";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (description) => {
    const newTask = {
      id: uuidv4(),
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const newDescription = prompt("Edit the task description:");
    if (newDescription) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, description: newDescription } : task
        )
      );
    }
  };

  return (
    <div className="task-list">
      {/* Pass addTask as a prop to TaskForm */}
      <TaskForm onAddTask={addTask} />
      {tasks
        .sort((a, b) => a.completed - b.completed) // Sort tasks: pending first
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
    </div>
  );
};

export default TaskList;
