import axios from "axios";

// get user token from local storage
const fetchUserToken = JSON.parse(localStorage.getItem("todoapp-token"));
axios.defaults.headers.common["Authorization"] = `Bearer ${
  fetchUserToken ? fetchUserToken.data && fetchUserToken.data.token : ""
}`;
console.log("Stored token:", fetchUserToken.data.token);

// Create a new todo
const createTodo = (todoData) => {
  return axios.post("/todo/create", todoData);
};

const getAllTodos = (userId) => {
  return axios.get(`/todo/get-all/${userId}`);
};

const updateTodo = (todoId, updatedData) => {
  return axios.put(`/todo/update/${todoId}`, updatedData);
};
const deleteTodo = (todoId) => {
  return axios.delete(`/todo/delete/${todoId}`);
};

const TodoServices = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
export default TodoServices;
