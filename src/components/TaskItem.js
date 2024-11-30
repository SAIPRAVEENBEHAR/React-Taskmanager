import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, newDescription); // Save edits
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div style={styles.taskItem}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      ) : (
        <span
          style={{
            textDecoration: task.isCompleted ? "line-through" : "none",
          }}
        >
          {task.description}
        </span>
      )}
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

const styles = {
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
};

export default TaskItem;
