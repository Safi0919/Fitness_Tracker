import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"user",
    password:"password",
    database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/workouts", (req,res)=>{
    const q = "SELECT * FROM workouts"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.post("/workouts", (req,res)=>{
    const q = "INSERT INTO `test`.`workouts` (`name`, `type`, `muscle`, `difficulty`, `instructions`, `reps`, `sets`) VALUES (?)"
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

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})