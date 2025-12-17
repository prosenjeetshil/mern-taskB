import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices'
import toast from 'react-hot-toast'
import { getErrorMessage } from '../utils/ErrorMessage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = { email, password }
      const res = await AuthServices.LoginUser(data)
      toast.success(res.data.message)
      console.log(res.data)
      navigate('/todos')
      localStorage.setItem('todoapp-token', JSON.stringify(res,data))
    } catch (err) {
      toast.error(getErrorMessage(err))
      console.log(err)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <div className="text-center mb-3">
          <i className="fa-solid fa-circle-user fa-3x text-primary"></i>
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
        </div>

        <div className="mb-3 text-center">
          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login
