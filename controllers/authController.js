const pool = require('../config/db');

// User Login (Now includes name & dob)
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, username, role, name, dob FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// User Registration (Includes name & dob)
exports.registerUser = async (req, res) => {
  const { username, password, role, name, dob } = req.body;

  if (!username || !password || !name || !dob) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, role, name, dob) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role, name, dob',
      [username, password, role, name, dob]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update User Password
exports.updatePassword = async (req, res) => {
  const { user_id, newPassword } = req.body;

  try {
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, user_id]);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Users (Acts as Employee List)
exports.getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, dob FROM users WHERE role = $1', ['Employee']);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Work Reports for a User (Employee)
exports.getEmployeeWorkReports = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM work_reports WHERE id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
