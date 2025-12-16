const express = require('express');
const router = express.Router();
const { createTodoController } = require("../controllers/todoController");
const authMiddleware = require('../middleware/authMiddleware');

//create todo
router.post('/create', authMiddleware , createTodoController)

module.exports = router;