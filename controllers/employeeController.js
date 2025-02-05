const pool = require('../config/db');

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM employees');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Work Reports for an Employee
exports.getEmployeeWorkReports = async (req, res) => {
  const { emp_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM work_reports WHERE emp_id = $1', [emp_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a New Employee
exports.createEmployee = async (req, res) => {
  const { user_id, name, dob } = req.body;

  if (!user_id || !name || !dob) {
    return res.status(400).json({ error: 'User ID, name, and date of birth are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO employees (user_id, name, dob) VALUES ($1, $2, $3) RETURNING id, name, dob',
      [user_id, name, dob]
    );

    res.json({
      success: true,
      employee: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
