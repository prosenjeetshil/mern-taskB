import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TodoServices from "../services/TodoServices";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = Boolean(id);
  const existingTodo = location.state?.todo;

  useEffect(() => {
    if (isEditMode && existingTodo) {
      setTitle(existingTodo.title);
      setDescription(existingTodo.description);
    }
  }, [isEditMode, existingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (title.trim().length > 50) {
      toast.error("Max 50 characters allowed in title");
      return;
    }

    if (description.trim().length > 180) {
      toast.error("Max 180 characters allowed in description");
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
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="todo-form-page">
        <div className="todo-form-card p-4">
          <div className="mb-4 text-center">
            <h4 className="fw-bold mb-1 text-white">
              {isEditMode ? "Edit Todo" : "Create New Todo"}
            </h4>
            <p className="text-secondary small">
              {isEditMode
                ? "Update your task details"
                : "Add a new task to stay productive"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-secondary">Title</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <small className="text-secondary float-end">
                {title.length}/50
              </small>
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary">Description</label>
              <textarea
                rows="4"
                className="form-control bg-dark text-white border-secondary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <small className="text-secondary float-end">
                {description.length}/180
              </small>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/todos")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Update Todo"
                  : "Create Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoForm;
