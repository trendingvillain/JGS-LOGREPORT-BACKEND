const express = require('express');
const router = express.Router();
const { getAllEmployees, getEmployeeWorkReports, createEmployee } = require('../controllers/employeeController');

// Route to get all employees
router.get('/', getAllEmployees);

// Route to get work reports for an employee
router.get('/:emp_id/work-reports', getEmployeeWorkReports);

// Route to create a new employee
router.post('/create', createEmployee);

module.exports = router;
