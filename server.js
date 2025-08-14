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

app.get("/api/data", async (req, res) => {
  try {
    const {search} = req.query;
    let query = 'SELECT * FROM "People"'; // Initialize the base query
    let values = [];

    if (search) {
      query += ' WHERE "name" ILIKE $1 OR "department" ILIKE $1'; //Search in "name" or "department"
      values.push(`%${search}%`); //Adds wildcards to the search term, done this way to prevent SQL injection
    }

    query += ' ORDER BY "name" ASC'; //Sort by "name" in ascending order

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});