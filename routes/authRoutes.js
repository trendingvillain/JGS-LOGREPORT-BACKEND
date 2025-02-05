const express = require('express');
const router = express.Router();
const { loginUser, registerUser, updatePassword,getAllEmployees,getEmployeeWorkReports } = require('../controllers/authController');

// Route to handle user login
router.post('/login', loginUser);

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle password update
router.put('/update-password', updatePassword);

router.get('/', getAllEmployees);

// Route to get work reports for an employee
router.get('/:user_id/work-reports', getEmployeeWorkReports);

module.exports = router;
