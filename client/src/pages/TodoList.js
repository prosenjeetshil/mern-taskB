import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TodoServices from "../services/TodoServices";
import Navbar from "../components/Navbar";
import TodoCard from "../components/TodoCard";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch todos when page loads
  useEffect(() => {
    fetchTodos();
  }, [page, searchTerm]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await TodoServices.getAllTodos(page, limit, searchTerm);

      setTodos(res.data.todos || []);
      setTotalPages(res.data.totalPages);
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

  const handleToggleStatus = async (todo) => {
    try {
      const updatedValue = !todo.isCompleted;

      await TodoServices.updateTodo(todo._id, { isCompleted: updatedValue });

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, isCompleted: updatedValue } : t
        )
      );
    } catch (error) {
      console.log("Error updating todo:", error);
      alert("Failed to update status");
    }
  };

  // const filteredTodos = todos.filter((todo) =>
  //   todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      <Navbar
        onSearch={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
      />

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

        {/* Pagination UI */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      page === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>

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
                onToggleStatus={handleToggleStatus}
              />
            </div>
          ))}

          
        </div>
      </div>
    </>
  );
};

export default TodoList;
