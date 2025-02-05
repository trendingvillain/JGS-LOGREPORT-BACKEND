const express = require('express');
const router = express.Router();
const { loginUser, registerUser, updatePassword } = require('../controllers/authController');

// Route to handle user login
router.post('/login', loginUser);

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle password update
router.put('/update-password', updatePassword);

module.exports = router;
