import axios from "axios";

// get user token from local storage
const fetchUserToken = JSON.parse(localStorage.getItem("todoapp-token"));
axios.defaults.headers.common["Authorization"] = `Bearer ${
  fetchUserToken ? fetchUserToken.data && fetchUserToken.data.token : ""
}`;
// console.log("Stored token:", fetchUserToken.data.token);

// Create a new todo
const createTodo = (todoData) => {
  return axios.post("/todo/create", todoData);
};

const getAllTodos = (page, limit, search="") => {
  return axios.get(`/todo/get-all?page=${page}&limit=${limit}&search=${search}`);
};

const updateTodo = (todoId, updatedData) => {
  return axios.put(`/todo/update/${todoId}`, updatedData);
};

const markTodoAsCompleted = (todoId) => {
  return updateTodo(todoId, { completed: true });
}

const markTodoAsPending = (todoId) => {
  return updateTodo(todoId, { completed: false });
}

const deleteTodo = (todoId) => {
  return axios.delete(`/todo/delete/${todoId}`);
};

const TodoServices = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  markTodoAsCompleted,
  markTodoAsPending
};
export default TodoServices;
