import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import HomePage from './pages/HomePage';
import TodoList from './pages/TodoList';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/todoList' element={<TodoList/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
