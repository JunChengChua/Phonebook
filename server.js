const express = require("express");
const cors    = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Hospital Directory",
    password: "root",
    port: 5432,
  });

//Query for results page coming from either search or department filter
app.get("/api/data", async (req, res) => {
  try {
    const { search, department } = req.query;
    let query = 'SELECT * FROM "People"';
    let values = [];

    if (search) {
      query += ' WHERE "name" ILIKE $1 OR "department" ILIKE $1';
      values.push(`%${search}%`);
    } else if (department) {
      query += ' WHERE "department" = $1';
      values.push(department);
    }

    query += ' ORDER BY "name" ASC';

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Query to get favorites based on usernames
app.get("/api/favorites", (req, res) => {
  const { usernames } = req.query;
  if (!usernames) {
    return res.json([]);
  }

  // Convert comma-separated string to array
  const usernameList = usernames.split(",");

  // Example for PostgreSQL — adjust table/column names to your DB
  const query = `
    SELECT *
    FROM "People"
    WHERE username = ANY($1)
  `;

  pool.query(query, [usernameList], (err, result) => {
    if (err) {
      console.error("Error fetching favorites:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(result.rows);
  });
});

//Query to return a list of distinct departments
app.get("/api/departments", async (req, res) => {
  try {
    const result = await pool.query(`SELECT DISTINCT department FROM "People" ORDER BY department ASC`);
    res.json(result.rows.map(row => row.department));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});