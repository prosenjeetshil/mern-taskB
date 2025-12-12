const express = require('express');
const { registerController, loginController } = require('../controllers/userController');
const router = express.Router();

//routes

//register user
router.post('/register', registerController)

//login user
router.post('/login', loginController)
module.exports = router;