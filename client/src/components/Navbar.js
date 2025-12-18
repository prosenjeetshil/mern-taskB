import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ onSearch }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("todoapp-token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const fetchUserName = JSON.parse(localStorage.getItem("todoapp-token"));
    console.log(
      "Fetched User Name:",
      fetchUserName && fetchUserName.data.user.username
    );
    setUserName(fetchUserName && fetchUserName.data.user.username);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <h4 className="navbar-brand">
              <i className="fa-regular fa-user" /> &nbsp;
              <i>Welcome</i> {userName}!
            </h4>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/todos"
                >
                  All Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todoList">
                  Pending Tasks
                </Link>
              </li>
              <div className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search tasks..."
                  aria-label="Search"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
              <li className="nav-item">
                <button
                  className="nav-link"
                  title="logout"
                  onClick={logoutHandler}
                >
                  <i className="fa-solid fa-right-from-bracket text-danger" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
