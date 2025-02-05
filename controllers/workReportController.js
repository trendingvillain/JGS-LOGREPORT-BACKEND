const pool = require('../config/db');

// Get All Work Reports
exports.getAllWorkReports = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM work_reports');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a New Work Report
exports.createWorkReport = async (req, res) => {
  const {
    date,
    machine_name,
    nature_of_complaint,
    solution,
    in_time,
    out_time,
    status,
    assistant_name,
    company_id,
    emp_id
  } = req.body;

  // Validate all fields are provided
  if (!date || !machine_name || !nature_of_complaint || !solution || !in_time || !out_time || !status || !assistant_name || !company_id || !emp_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Format in_time and out_time to include both date and time
    const formattedInTime = `${date} ${in_time}`;
    const formattedOutTime = `${date} ${out_time}`;

    // Query to insert work report
    const result = await pool.query(
      `INSERT INTO work_reports 
        (date, machine_name, nature_of_complaint, solution, in_time, out_time, status, assistant_name, company_id, emp_id) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING id, date, machine_name, status, assistant_name`,
      [
        date, 
        machine_name, 
        nature_of_complaint, 
        solution, 
        formattedInTime,  // Passing formatted in_time with date
        formattedOutTime, // Passing formatted out_time with date
        status, 
        assistant_name, 
        company_id, 
        emp_id
      ]
    );

    // Send response with newly created work report
    res.json({
      success: true,
      workReport: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
