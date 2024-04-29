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
            return res.status(200).json({ message: "Login successful" });
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

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})