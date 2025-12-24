import React from "react";

const TodoCard = ({ todo, onEdit, onDelete, onToggleStatus }) => {
  const formattedDate = new Date(todo.createdAt).toLocaleDateString();

  return (
    <div className="card todo-card h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-1 text-white">{todo.title}</h5>

          <span
            className={`badge ${
              todo.isCompleted ? "bg-success" : "bg-warning text-dark"
            }`}
          >
            {todo.isCompleted ? "Completed" : "Pending"}
          </span>
        </div>
        <small className="text-secondary mb-2">
          <i className="fa-regular fa-calendar me-1"></i>
          {formattedDate}
        </small>
        <p className="text-secondary flex-grow-1">
          {todo.description.length > 80
            ? todo.description.slice(0, 80) + "..."
            : todo.description}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => onToggleStatus(todo)}
          >
            {todo.isCompleted ? "Mark Pending" : "Mark Done"}
          </button>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(todo)}
              title="Edit"
            >
              <i className="fa-solid fa-pen"></i>
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(todo._id)}
              title="Delete"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
