import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("You are connected to the backend!")
})


// Can't use get for some reason
app.get("/users", (req,res)=>{
    const q = "SELECT * FROM users"

    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.get("/users/:id", (req, res) => {
    const userid = req.params.id;
    const q = "SELECT * FROM users WHERE userid = ?";

    db.query(q, [userid], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/users", (req, res) => {
  const q =
    "INSERT INTO users (`username`, `email`, `phoneNum`, `password`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.email,
    req.body.phoneNum,
    req.body.password,
  ];
  console.log(req.body);

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been created successfully!");
  });
});

app.get("/workouts", (req,res)=>{
    const q = "SELECT * FROM workouts"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.get("/workouts/:id", (req, res) => {
    const workoutid = req.params.id;
    const q = "SELECT * FROM workouts WHERE workoutid = ?";
  db.query(q, [workoutid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0] || {});
  });
});

app.post("/workouts", (req,res)=>{
    const q = "INSERT INTO workouts (`name`, `type`, `muscle`, `difficulty`, `instructions`, `reps`, `sets`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.type,
        req.body.muscle,
        req.body.difficulty,
        req.body.instructions,
        req.body.reps,
        req.body.sets];

    db.query(q,[values], (err,data)=>{
        if (err) return res.json(err)
        return res.json("Workout has been created successfully!");
    })
})

app.put("/workouts/:id", (req,res)=>{
    const workoutid = req.params.id;
    const q = "UPDATE workouts SET `name` = ?, `type` = ?, `muscle` = ?, `difficulty` = ?, `instructions` = ?, `reps` = ?, `sets` = ? WHERE workoutid = ?";

    const values = [
        req.body.name,
        req.body.type,
        req.body.muscle,
        req.body.difficulty,
        req.body.instructions,
        req.body.reps,
        req.body.sets];

    db.query(q,[...values,workoutid], (err,data)=>{
        if (err) return res.json(err)
        return res.json("Workout has been updated successfully!");
    })
})

app.delete("/workouts/:id", (req,res)=>{
    const workoutid = req.params.id;
    const q = "DELETE FROM workouts WHERE workoutid = ?";

    db.query(q,[workoutid], (err,data)=>{
        if (err) return res.json(err)
        return res.json("Workout has been deleted successfully!");
    })
})

app.get("/routines", (req, res) => {
  const q = "SELECT * FROM routines";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/routines/:id", (req, res) => {
  const workoutid = req.params.id;
  const q = "SELECT * FROM routines WHERE routineid = ?";
  db.query(q, [workoutid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0] || {});
  });
});

app.post("/routines", (req, res) => {
  const q =
    "INSERT INTO routines (`name`) VALUES (?)";
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
    return res.json("Routine has been created successfully!");
  });
});

app.put("/routines/:id", (req, res) => {
  const workoutid = req.params.id;
  const q =
    "UPDATE routines SET `name` = ? WHERE routineid = ?";

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
    return res.json("Routine has been updated successfully!");
  });
});

app.delete("/routines/:id", (req, res) => {
  const workoutid = req.params.id;
  const q = "DELETE FROM routine WHERE routinesid = ?";

  db.query(q, [workoutid], (err, data) => {
    if (err) return res.json(err);
    return res.json("Routine has been deleted successfully!");
  });
});

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})