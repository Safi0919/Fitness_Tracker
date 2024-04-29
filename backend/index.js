import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

// App configuration
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Backend connection
app.get("/", (req, res) => {
  res.json("You are connected to the backend!");
});

// Can't use get for some reason
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/users/:id", (req, res) => {
  const userid = req.params.id;
  const q = "SELECT * FROM users WHERE userid = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/workouts", (req,res)=>{
    const q = "SELECT * FROM workouts"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.post("/login", (req, res) => {
    const q = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [
        req.body.username,
        req.body.password
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 1) {
            // If login is successful, return the user ID
            return res.status(200).json({ userid: data[0].userid });
        } else {
            return res.status(401).json({ error: "Invalid username or password" });
        }
    });
});



app.post("/users", (req,res)=>{
    const q = "INSERT INTO users (`username`, `email`, `phoneNum`, `password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.email,
        req.body.phoneNum,
        req.body.password
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username already exists!' });
            } else {
                return res.status(500).json({ message: 'An error occurred while processing your request' });
            }
        } else {
            return res.status(200).json("Registration successful!");
        }
    });
});


app.get("/workouts/:id", (req, res) => {
  const workoutid = req.params.id;
  const q = "SELECT * FROM workouts WHERE workoutid = ?";
  db.query(q, [workoutid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0] || {});
  });
});

app.post("/workouts", (req, res) => {
  const q =
    "INSERT INTO workouts (`name`, `type`, `muscle`, `difficulty`, `instructions`, `reps`, `sets`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.type,
    req.body.muscle,
    req.body.difficulty,
    req.body.instructions,
    req.body.reps,
    req.body.sets,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workout has been created successfully!");
  });
});

app.put("/workouts/:id", (req, res) => {
  const workoutid = req.params.id;
  const q =
    "UPDATE workouts SET `name` = ?, `type` = ?, `muscle` = ?, `difficulty` = ?, `instructions` = ?, `reps` = ?, `sets` = ? WHERE workoutid = ?";

  const values = [
    req.body.name,
    req.body.type,
    req.body.muscle,
    req.body.difficulty,
    req.body.instructions,
    req.body.reps,
    req.body.sets,
  ];

  db.query(q, [...values, workoutid], (err, data) => {
    if (err) return res.json(err);
    return res.json("Workout has been updated successfully!");
  });
});

app.delete("/workouts/:id", (req, res) => {
  const workoutid = req.params.id;
  const q1 = "DELETE FROM routines_to_workouts WHERE workoutid = ?";
  const q2 = "DELETE FROM workouts WHERE workoutid = ?";

  db.query(q1, [workoutid], (err1, data1) => {
    if (err1) {
      console.error("Error deleting routines_to_workouts:", err1);
      return res.status(500).json(err1);
    }

    db.query(q2, [workoutid], (err2, data2) => {
      if (err2) {
        console.error("Error deleting workout:", err2);
        return res.status(500).json(err2);
      }

      console.log("Workout has been deleted successfully!");
      return res.json("Workout has been deleted successfully!");
    });
  });
});


app.get("/routines", (req, res) => {
  const q = "SELECT * FROM routines";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/routines/:id", (req, res) => {
  const routineid = req.params.id;
  const q = "SELECT * FROM routines WHERE routineid = ?";
  db.query(q, [routineid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0] || {});
  });
});

app.post("/routines", (req, res) => {
  const q = "INSERT INTO routines (`routinename`) VALUES (?)";

  db.query(q, [req.body.routinename], (err, result) => {
    if (err) return res.status(400).json(err);
    const newRoutineId = result.insertId;
    return res.json({
      message: "Routine has been created successfully!",
      id: newRoutineId,
    });
  });
});

app.post("/routines/:id/workouts", (req, res) => {
  const routineId = req.params.id;
  const workoutIds = req.body.workoutIds;

  workoutIds.forEach((workoutId) => {
    const q =
      "INSERT INTO routines_to_workouts (routineid, workoutid) VALUES (?, ?)";
    db.query(q, [routineId, workoutId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).json(err);
      }
    });
  });

  res.json({ message: "Workouts added to routine successfully!" });
});

app.put("/routines/:id", (req, res) => {
  const routineid = req.params.id;
  const routinename = req.body; // Extract routinename from the request body

  // Ensure that the routinename is provided
  if (!routinename) {
    return res.status(400).json({ message: "Routine name is required" });
  }

  const q = "UPDATE routines SET `routinename` = ? WHERE routineid = ?";
  db.query(q, [routinename, routineid], (err, data) => {
    if (err) {
      console.error("Error updating routine:", err);
      return res.status(500).json(err);
    }
    // Check if the update was successful, e.g., if any rows were actually changed
    if (data.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No routine found with the given ID" });
    }
    return res.json({ message: "Routine has been updated successfully!" });
  });
});


app.put("/routines/:id/workouts", async (req, res) => {
  const routineId = req.params.id;
  const workoutIds = req.body.workoutIds;

  try {
    // Begin transaction
    await db.beginTransaction();

    // Delete existing workout associations
    await db.query("DELETE FROM routines_to_workouts WHERE routineid = ?", [
      routineId,
    ]);

    // Insert new workout associations if there are any
    if (workoutIds.length > 0) {
      const insertValues = workoutIds.map((workoutId) => [
        routineId,
        workoutId,
      ]);
      await db.query(
        "INSERT INTO routines_to_workouts (routineid, workoutid) VALUES ?",
        [insertValues]
      );
    }

    // Commit transaction
    await db.commit();

    res.json({ message: "Workouts updated for routine successfully!" });
  } catch (err) {
    // Rollback in case of error
    await db.rollback();
    console.error("Error updating workouts for routine:", err);
    res.status(500).json(err);
  }
});







// Delete routines and its workouts
app.delete("/routines/:id", (req, res) => {
  const routineid = req.params.id;
  const q1 = "DELETE FROM routines_to_workouts WHERE routineid = ?";
  const q2 = "DELETE FROM routines WHERE routineid = ?";

  db.query(q1, [routineid], (err1, data1) => {
    if (err1) {
      console.error("Error deleting routines_to_workouts:", err1);
      return res.status(500).json(err1);
    }

    db.query(q2, [routineid], (err2, data2) => {
      if (err2) {
        console.error("Error deleting routines:", err2);
        return res.status(500).json(err2);
      }

      console.log("Routine has been deleted successfully!");
      return res.json("Routine has been deleted successfully!");
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});