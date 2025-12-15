import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthServices from '../services/AuthServices'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = { username, email, password }
      const res = await AuthServices.registerUser(data)
      toast.success(res.data.message)
      console.log(res.data)
      navigate('/home')
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
      console.log(error)
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
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
          />
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
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  )
}

export default Register