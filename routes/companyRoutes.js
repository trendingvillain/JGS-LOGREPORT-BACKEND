const express = require('express');
const router = express.Router();
const { getAllCompanies, getCompanyWorkReports, createCompany } = require('../controllers/companyController');

// Route to get all companies
router.get('/', getAllCompanies);

// Route to get work reports for a company
router.get('/:com_id/work-reports', getCompanyWorkReports);

// Route to create a new company
router.post('/create', createCompany);

module.exports = router;
