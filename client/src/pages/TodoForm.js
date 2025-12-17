import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoServices from "../services/TodoServices";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); // todo id (edit mode)
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  // Optional: fetch existing todo data if editing
  useEffect(() => {
    if (isEditMode) {
      fetchTodoById();
    }
  }, [id]);

  const fetchTodoById = async () => {
    try {
      // You may already have todo data in TodoList
      // If not, backend should expose get-single-todo API
      // For now, assume data is passed via route state OR skip this
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await TodoServices.updateTodo(id, {
          title,
          description,
        });
      } else {
        await TodoServices.createTodo({
          title,
          description,
        });
      }

      navigate("/todos");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isEditMode ? "Edit Todo" : "Create Todo"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update Todo" : "Create Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
