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
      const result = await pool.query('SELECT * FROM "People"');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });