import axios from 'axios'

const registerUser = (data) => {
    return axios.post('/user/register', data)
}

const LoginUser = (data) => {
    return axios.post('/user/login', data)
}

const AuthServices = {
  registerUser,
  LoginUser
}

export default AuthServices