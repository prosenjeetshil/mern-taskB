import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("todoapp-token");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark border-bottom px-3">
        <div className="container-fluid">
          <Link to="/todos">
            <img
              src={require("../assets/images/logo-2.png")}
              alt="taskB logo"
              height={36}
              className="ms-5 ps-4"
            />
          </Link>
          
          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link" to="/todos">
                  All Tasks
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={logoutHandler}
                >
                  <i className="fa-solid fa-right-from-bracket me-1"></i>
                  Logout
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
