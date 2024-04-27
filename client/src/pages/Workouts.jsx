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

  return (
    <div>
        <h1>Workouts</h1>
        <div className="workouts">
            {workouts.map(workout=>(
                <div className="workout">
                    {workout.name}
                </div>
            ))}
        </div>
        <button><Link to="/add">Button</Link></button>
    </div>
  )
}

export default Workouts