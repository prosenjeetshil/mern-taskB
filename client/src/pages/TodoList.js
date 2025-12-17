import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoServices from "../services/TodoServices";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch todos when page loads
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await TodoServices.getAllTodos();

      setTodos(res.data.todos || []);
    } catch (error) {
      console.log("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) return;

    try {
      await TodoServices.deleteTodo(todoId);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.log("Error deleting todo:", error);
      alert("Failed to delete todo");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {/* Header section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>My Todos</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/todo/new")}
          >
            + Create Todo
          </button>
        </div>

        {/* Loading state */}
        {loading && <p>Loading todos...</p>}

        {/* Empty state */}
        {!loading && todos.length === 0 && (
          <p className="text-muted">No todos found.</p>
        )}

        {/* Todo cards */}
        <div className="row">
          {todos.map((todo) => (
            <div className="col-md-4 mb-3" key={todo._id}>
              <TodoCard
                todo={todo}
                onEdit={() =>
                  navigate(`/todo/edit/${todo._id}`, {
                    state: { todo },
                  })
                }
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
