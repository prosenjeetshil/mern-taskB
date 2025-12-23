import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthServices from "../services/AuthServices";
import { getErrorMessage } from "../utils/ErrorMessage";
// import BrandMark from "../components/BrandMark";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const data = { email, password };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      console.log(res.data);
      navigate("/todos");
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          {/* <BrandMark/> */}
          <div className="mb-2">
            <i className="fa-solid fa-user-plus fa-2x text-danger"></i>
          </div>
          <h3 className="fw-bold">Create your account</h3>
          <p className="text-muted small">
            Start organizing your tasks with <strong>taskB</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={loading}
            />
            <small className="text-muted">Must be at least 6 characters</small>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0 text-muted">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
