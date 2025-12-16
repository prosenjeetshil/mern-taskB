const express = require('express');
const router = express.Router();
const { createTodoController } = require("../controllers/todoController");

//create todo
router.post('/create', createTodoController)

module.exports = router;