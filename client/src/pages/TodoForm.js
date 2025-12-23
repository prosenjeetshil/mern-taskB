import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TodoServices from "../services/TodoServices";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="mb-4 text-center">
                  <h4 className="fw-bold mb-1">
                    {isEditMode ? "Edit Todo" : "Create New Todo"}
                  </h4>
                  <p className="text-danger small">
                    {isEditMode
                      ? "Update your task details"
                      : "Add a new task to stay productive"}
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                      <small
                        className={
                          title.length > 45 ? "text-danger" : "text-secondary"
                        }
                      >
                        {title.length}/50
                      </small>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Description
                    </label>
                    <textarea
                      type="text"
                      rows="4"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="d-flex justify-content-end">
                      <small
                        className={
                          description.length > 160
                            ? "text-danger"
                            : "text-secondary"
                        }
                      >
                        {description.length}/180
                      </small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/todos")}
                      disabled={loading}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoForm;
