import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/ErrorMessage";
import axios from "axios";
// import BrandMark from "../components/BrandMark";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todoapp-token");
    if (token) {
      navigate("/todos", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const data = { email, password };
      const res = await AuthServices.LoginUser(data);

      console.log(res.data);
      toast.success(res.data.message);
      navigate("/todos", { replace: true });

      localStorage.setItem(
        "todoapp-token",
        JSON.stringify({
          token: res.data.token,
          user: res.data.user,
        })
      );

      // localStorage.setItem("todoapp-token", JSON.stringify(res, data));
      // const fetchUserToken = JSON.parse(localStorage.getItem("todoapp-token"));
      // axios.defaults.headers.common["Authorization"] = `Bearer ${
      //   fetchUserToken ? fetchUserToken.data && fetchUserToken.data.token : ""
      // }`;
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          {/* <BrandMark/> */}
          <div className="mb-2">
            <i className="fa-solid fa-right-to-bracket fa-2x text-danger"></i>
          </div>
          <h3 className="fw-bold">Welcome back</h3>
          <p className="text-muted small">
            Login to continue managing your tasks
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
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Logging in.." : "Login"}
          </button>
        </form>

        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0 text-muted">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>
      </div>
    </div>
    // <div className="d-flex justify-content-center align-items-center vh-100">
    //   <div className="card shadow p-4" style={{ width: "400px" }}>
    //     <div className="text-center mb-3">
    //       <i className="fa-solid fa-circle-user fa-3x text-primary"></i>
    //     </div>

    //     <div className="mb-3">
    //       <input
    //         type="email"
    //         className="form-control"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => {
    //           setEmail(e.target.value);
    //         }}
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <input
    //         type="password"
    //         className="form-control"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //       />
    //     </div>

    //     <div className="mb-3 text-center">
    //       <p>
    //         Don't have an account?
    //         <Link to="/register"> Register</Link>
    //       </p>
    //     </div>

    //     <button className="btn btn-primary w-100" onClick={handleSubmit}>
    //       Login
    //     </button>
    //   </div>
    // </div>
  );
};

export default Login;
