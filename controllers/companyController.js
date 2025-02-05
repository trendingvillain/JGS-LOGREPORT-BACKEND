const pool = require('../config/db');

// Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, company_name, location  FROM companies');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Work Reports for a Company
exports.getCompanyWorkReports = async (req, res) => {
  const { com_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM work_reports WHERE company_id = $1', [com_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a New Company
exports.createCompany = async (req, res) => {
  const { company_name, location } = req.body;

  if (!company_name || !location) {
    return res.status(400).json({ error: 'Company name and location are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO companies (company_name, location) VALUES ($1, $2) RETURNING id, company_name, location',
      [company_name, location]
    );

    res.json({
      success: true,
      company: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
