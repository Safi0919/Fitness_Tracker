import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"user",
    password:"password",
    database:"fitnesstracker"
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

app.post("/users", (req,res)=>{
    const q = "INSERT INTO users (`username`, `email`, `phoneNum`, `password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.email,
        req.body.phoneNum,
        req.body.password
    ];
    console.log(req.body);

    db.query(q,[values], (err,data)=>{
        if (err) return res.json(err)
        return res.json("User has been created successfully!");       
    })
})

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