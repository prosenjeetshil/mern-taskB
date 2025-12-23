import axios from 'axios'
import api from './api'

const registerUser = (data) => {
    return api.post('/user/register', data)
}

const LoginUser = (data) => {
    return api.post('/user/login', data)
}

const AuthServices = {
  registerUser,
  LoginUser
}

export default AuthServices