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
        <table>
            <tbody>
                <tr>
                    <th>Workout Name</th>
                    <th>Type</th>
                    <th>Muscle Group</th>
                    <th>Difficulty</th>
                    <th>Reps</th>
                    <th>Sets</th>
                    <th>Instructions</th>
                </tr>
                {workouts.map((val, key) => (
                    <tr key={key}>
                        <td>{val.name}</td>
                        <td>{val.type}</td>
                        <td>{val.muscle}</td>
                        <td>{val.difficulty}</td>
                        <td>{val.reps}</td>
                        <td>{val.sets}</td>
                        <td>{val.instructions}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <button><Link to="/workouts/add">Add</Link></button>
    </div>
  )
}
// TODO: add a button for adding a workout to a user's profile
export default Workouts