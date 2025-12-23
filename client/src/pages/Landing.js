import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todoapp-token");
    if (token) {
      navigate("/todos", { replace: true });
    }
  }, []);

  return (
    <>
      <div className="landing-page">
        <div className="container">
          <div className="row align-items-center w-100">
            {/* left col */}
            <div className="col-md-6 text-center text-md-start">
              {/* logo */}
              <img
                src={require("../assets/images/logo-1.png")}
                alt="taskB logo"
                height={100}
                className="logo-shift-left"
              />
              <h1 className="fw-bold text-white display-4">
                Organize Your Tasks. <br />
                <span className="text-danger">Boost Productivity.</span>
              </h1>
              <p className="text-white mt-3">
                A simple and powerful task manager to help you stay focused,
                track progress, and get things done efficiently.
              </p>
              <div className="mt-4">
                <Link to="/register" className="btn btn-danger btn-lg me-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">
                  Login
                </Link>
              </div>
            </div>
            {/* right col */}
            <div className="col-md-6 text-center">
              <img
                src={require("../assets/images/todo-landing-1.png")}
                alt="Todo App"
                className="img-fluid landing-image ms-3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
