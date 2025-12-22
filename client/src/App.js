import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";
import { Toaster } from "react-hot-toast";
import TodoForm from "./pages/TodoForm";
import RequireAuth from "./services/RequireAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />
        <Route path="/todo/new" element={<TodoForm />} />
        <Route path="/todo/edit/:id" element={<TodoForm />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
