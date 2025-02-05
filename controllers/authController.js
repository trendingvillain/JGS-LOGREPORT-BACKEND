const pool = require('../config/db');

// User Login (No JWT, No Hashing)
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, username, role FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// User Registration
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Insert the new user into the users table
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, password, role]
    );

    // Return the user details
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Password
exports.updatePassword = async (req, res) => {
  const { user_id, newPassword } = req.body;

  try {
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, user_id]);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
