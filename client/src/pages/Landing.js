import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* LEFT TEXT AREA */}
        <div className="col-md-6">
          <h1 className="fw-bold display-5">
            <span className="text-dark">Lorem ipsum dolor sit</span> <br />
            <span className="text-danger">amet.</span>
          </h1>

          <p className="text-muted mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <div className="mt-4">
            <Link className="btn btn-danger me-3" to="/register">
              Register Now!
            </Link>

            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img
            className="img-fluid rounded shadow"
            src={require("../assets/images/todo-landing.jpg")}
            alt="todo landing"
          />
        </div>

      </div>
    </div>
  );
};

export default Landing;
