import React from "react";

const TodoCard = ({ todo, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {todo.isCompleted && (
            <i className="fa fa-check-circle text-success me-2"></i>
          )}
          {todo.title}
        </h5>

        <p className="card-text flex-grow-1">{todo.description}</p>

        <div className="d-flex gap-2 mt-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(todo)}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(todo._id)}
          >
            Delete
          </button>
          <button
            className={`btn btn-sm ${
              todo.isCompleted ? "btn-success" : "btn-warning"
            }`}
            onClick={() => onToggleStatus(todo)}
          >
            {todo.isCompleted ? "Completed" : "Pending"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
