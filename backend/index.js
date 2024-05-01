import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

// App configuration
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// DB connection; make sure to set up .env variables
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

// Can't use get for some reason (?)
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// ?
/*app.get("/users/:id", (req, res) => {
  const userid = req.params.id;
  const q = "SELECT * FROM users WHERE userid = ?";

  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });*/

// potential fix for above (?)
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "SELECT * FROM users WHERE userid = ?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ error: "Failed to retrieve user." });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(data[0]);
  });
});

// Get ALL workouts
app.get("/workouts", (req,res)=>{
    const q = "SELECT * FROM workouts"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    })
})

// Login Authentication
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

// Signup; add user to users
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

// Get workout with corresponding workout id
app.get("/workouts/:id", (req, res) => {
  const workoutid = req.params.id;
  const q = "SELECT * FROM workouts WHERE workoutid = ?";
  db.query(q, [workoutid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0] || {});
  });
});

// Add workout to workouts
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
    const newWorkoutId = data.insertId;
    return res.json({
      message: "Workout has been created successfully!",
      id: newWorkoutId,
    });
  });
});

// Update workout
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

  db.query(q, [...values, workoutid], (err, result) => {
    if (err) return res.json(err);
    return res.json("Workout has been updated successfully!");
  });
});

// Delete workout from db and its association within routines
app.delete("/workouts/:id", (req, res) => {
  const workoutid = req.params.id;
  const q1 = "DELETE FROM routines_to_workouts WHERE workoutid = ?";
  const q2 = "DELETE FROM workouts_to_users WHERE workoutid = ?"
  const q3 = "DELETE FROM workouts WHERE workoutid = ?";

  db.query(q1, [workoutid], (err1, data1) => {
    if (err1) {
      console.error("Error deleting routines_to_workouts:", err1);
      return res.status(500).json(err1);
    }

  db.query(q2, [workoutid], (err2, data2) => {
    if (err2) {
      console.error("Error deleting workouts_to_routines:", err2);
      return res.status(500).json(err2)
    }
  })

    db.query(q3, [workoutid], (err3, data2) => {
      if (err3) {
        console.error("Error deleting workout:", err3);
        return res.status(500).json(err3);
      }

      console.log("Workout and associated data have been deleted successfully!");
      return res.json("Workout and associated data have been deleted successfully!");
    });
  });
});

// Get ALL routines, not needed anymore
app.get("/routines", (req, res) => {
  const q = "SELECT * FROM routines";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



// Retrieves all routines created by user
app.get("/routines/user/:userid", (req, res) => {
  const userid = req.params.userid;
  const q = `
    SELECT r.*
    FROM routines AS r
    INNER JOIN users_to_routines AS ur ON r.routineid = ur.routineid
    WHERE ur.userid = ?`;

  db.query(q, [userid], (err, data) => {
    if (err) {
      console.error("Error retrieving routines for user:", err);
      return res.status(500).json(err);
    }
    console.log("Routines retrieved successfully for user:", userid);
    return res.json(data);
  });
});

// Retrieves all workouts created by user
app.get("/workouts/user/:userid", (req, res) => {
  const userid = req.params.userid;
  const q = `
    SELECT w.*
    FROM workouts AS w
    INNER JOIN workouts_to_users AS uw ON w.workoutid = uw.workoutid
    WHERE uw.userid = ?`;

  db.query(q, [userid], (err, data) => {
    if (err) {
      console.error("Error retrieving workouts for user:", err);
      return res.status(500).json(err);
    }
    console.log("Workouts retrieved successfully for user:", userid);
    return res.json(data);
  });
});

// Add users_to_routines
app.post("/users_to_routines", (req, res) => {
  const { userId, routineId } = req.body;

  // Check if userId and routineId are provided
  if (!userId || !routineId) {
    return res.status(400).json({ error: "Both userId and routineId are required." });
  }

  // Insert into users_to_routines table
  const q = "INSERT INTO users_to_routines (userid, routineid) VALUES (?, ?)";
  db.query(q, [userId, routineId], (err, result) => {
    if (err) {
      console.error("Error associating routine with user:", err);
      return res.status(500).json(err);
    }
    console.log("Routine associated with user successfully:", routineId);
    return res.status(200).json({ message: "Routine associated with user successfully." });
  });
});

// Add workouts_to_users
app.post("/workouts_to_users", (req, res) => {
  const { userId, workoutId } = req.body;

  // Check if userId and workoutId are provided
  if (!userId || !workoutId) {
    return res.status(400).json({ error: "Both userId and workoutId are required." });
  }

  // Insert into workouts_to_users table
  const q = "INSERT INTO workouts_to_users (userid, workoutid) VALUES (?, ?)";
  db.query(q, [userId, workoutId], (err, result) => {
    if (err) {
      console.error("Error associating workout with user:", err);
      return res.status(500).json(err);
    }
    console.log("Workout associated with user successfully:", result.insertId);
    return res.status(200).json({ message: "Workout associated with user successfully." });
  });
});

// Get routine name
app.get("/routines/:id", (req, res) => {
  const routineid = req.params.id;
  const q = "SELECT * FROM routines WHERE routineid = ?";
  db.query(q, [routineid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0] || {});
  });
});

/*
// Get routine with corresponding routineid and associated workouts
app.get("/routines/:id", (req, res) => {
  const routineid = req.params.id;
  const routineQuery = "SELECT * FROM routines WHERE routineid = ?";
  const workoutsQuery = "SELECT * FROM workouts WHERE routineid = ?";

  db.query(routineQuery, [routineid], (err, routineData) => {
    if (err) return res.json(err);

    db.query(workoutsQuery, [routineid], (err, workoutsData) => {
      if (err) return res.json(err);

      const routine = routineData[0] || {};
      const workouts = workoutsData || [];

      return res.json({ routine, workouts });
    });
  });
});*/

// Retrieve all routines' workouts (used for RoutinePage)
// Update naming convention later? '/routines/workouts/:id'
app.get("/routines/workouts/:id", (req, res) => {
  const routineId = req.params.id;
  const workoutsQuery = `
    SELECT w.*
    FROM workouts AS w
    INNER JOIN routines_to_workouts AS rw ON w.workoutid = rw.workoutid
    WHERE rw.routineid = ?;
  `;
  const routineNameQuery = "SELECT routinename FROM routines WHERE routineid = ?";

  db.query(routineNameQuery, [routineId], (routineErr, routineData) => {
    if (routineErr) {
      console.error("Error retrieving routine name:", routineErr);
      return res.status(500).json({ error: "Internal server error" });
    }

    const routineName = routineData.length > 0 ? routineData[0].routinename : null;

    db.query(workoutsQuery, [routineId], (workoutsErr, workoutsData) => {
      if (workoutsErr) {
        console.error("Error retrieving workouts:", workoutsErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      return res.json({ routineName, workouts: workoutsData });
    });
  });
});


// Add routine
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

// Add workouts to a routine
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


// Update routine
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


// Delete all previous workouts in routine and update with new workouts
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

// Delete routine AND its workout/userid association
app.delete("/routines/:id", (req, res) => {
  const routineid = req.params.id;
  const q1 = "DELETE FROM routines_to_workouts WHERE routineid = ?";
  const q2 = "DELETE FROM users_to_routines WHERE routineid = ?";
  const q3 = "DELETE FROM routines WHERE routineid = ?";

  db.query(q1, [routineid], (err1, data1) => {
    if (err1) {
      console.error("Error deleting routines_to_workouts:", err1);
      return res.status(500).json(err1);
    }

    db.query(q2, [routineid], (err2, data2) => {
      if (err2) {
        console.error("Error deleting users_to_routines:", err2);
        return res.status(500).json(err2);
      }

      db.query(q3, [routineid], (err3, data3) => {
        if (err3) {
          console.error("Error deleting routines:", err3);
          return res.status(500).json(err3);
        }

        console.log("Routine and associated data have been deleted successfully!");
        return res.json("Routine and associated data have been deleted successfully!");
      });
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});