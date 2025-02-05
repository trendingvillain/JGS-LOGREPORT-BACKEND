const express = require('express');
const cors = require('cors');
const pool = require('./config/db');  // Import your database configuration

const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const workReportRoutes = require('./routes/workReportRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Test database connection route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');  // Query to check DB connection
    res.json({
      success: true,
      message: 'Database connected!',
      time: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to connect to the database', details: err });
  }
});

app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/work-reports', workReportRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
