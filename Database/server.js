import express from "express";
import connectDB from "./connectDB.js";
import DataModel from "./models/DataModel.js";

const router = express.Router();

const app = express();
const port = 5000;

await connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Test");
});
//Query for results page coming from either search or department filter
app.get("/api/data", async (req, res) => {
  try {
    console.log("Received query:", req.query);
    const {search} = req.query;
    let sort = {};
    let filter = {};
    if (search.length > 0) {
      filter = {
        $or: [
          { name: {$regex: search, $options:'i'} },
          { department: {$regex: search, $options:'i'} }
        ]
      }
    }
    console.log("Filter applied:", filter);
    sort = {
      name: {$regex: search, $options: 'i'} ? -1 : 0,
    };

    const data = await DataModel.find(filter).limit(100);

    const prioritizedData = data.sort((a, b) => {
      const aNameMatch = a.name?.toLowerCase().includes(search?.toLowerCase());
      const bNameMatch = b.name?.toLowerCase().includes(search?.toLowerCase());

      //In case there are no name matches
      const aDeptMatch = a.department?.toLowerCase().includes(search?.toLowerCase());
      const bDeptMatch = b.department?.toLowerCase().includes(search?.toLowerCase());

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      if (aDeptMatch && !bDeptMatch) return -1;
      if (!aDeptMatch && bDeptMatch) return 1;
      
      return 0;
    });

    res.json({
      success: true,
      count: prioritizedData.length,
      results: prioritizedData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Query to return a list of distinct departments
app.get("/api/departments", async (req, res) => {
  try {
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Query to get favorites based on usernames
/* app.get("/api/favorites", (req, res) => {
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

*/

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});