const express = require('express');
const router = express.Router();
const { createTodoController, getAllTodosController, updateTodoController, deleteTodoController } = require("../controllers/todoController");
const authMiddleware = require('../middleware/authMiddleware');

//create todo
router.post('/create', authMiddleware , createTodoController)
router.get('/get-all', authMiddleware , getAllTodosController)
router.put('/update/:todoId', authMiddleware, updateTodoController )
router.delete('/delete/:todoId', authMiddleware, deleteTodoController )

module.exports = router;