import React from "react";

const TodoCard = ({ todo, onEdit, onDelete }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{todo.title}</h5>

        <p className="card-text flex-grow-1">
          {todo.description}
        </p>

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
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
