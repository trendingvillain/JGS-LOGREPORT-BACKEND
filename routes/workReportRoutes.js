const express = require('express');
const router = express.Router();
const { getAllWorkReports, createWorkReport } = require('../controllers/workReportController');

// Route to get all work reports
router.get('/', getAllWorkReports);

// Route to create a new work report
router.post('/create', createWorkReport);

module.exports = router;
