import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Workouts = () => {
  const [workouts, setworkouts] = useState([]);

  useEffect(()=>{
    const fetchAllWorkouts = async () =>{
        try{
            const res = await axios.get("http://localhost:8800/workouts");
            console.log(res);
            setworkouts(res.data);
        }catch(err){
            console.log(err);
        }
    }
    fetchAllWorkouts();
  },[])

  const handleDelete = async (id)=>{
    try {
        await axios.delete("http://localhost:8800/workouts/"+id);
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>
        <h1>Workouts</h1>
        <div className="workouts">
            {workouts.map(workout=>(
                <div className="workout">
                    <h2>{workout.name}</h2>
                    <h2>{workout.type}</h2>
                    <h2>{workout.muscle}</h2>
                    <h2>{workout.difficulty}</h2>
                    <p>{workout.instructions}</p>
                    <h2>{workout.reps}</h2>
                    <h2>{workout.sets}</h2>
                    <button className="delete" onClick={()=>handleDelete(workout.workoutid)}>Delete</button>
                    <button className="update"><Link to={`/workouts/update/${workout.workoutid}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button><Link to="/workouts/add">Add</Link></button>
    </div>
  )
}

export default Workouts