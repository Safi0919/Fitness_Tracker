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
            <table>
                <tr>
                <th>Workout Name</th>
                <th>Type</th>
                <th>Muscle Group</th>
                <th>Difficulty</th>
                <th>Instructions</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Action</th>
                </tr>
            {workouts.map((val,key)=>{
                return (
                    <tr key={key}>
                        <td>{val.name}</td>
                        <td>{val.type}</td>
                        <td>{val.muscle}</td>
                        <td>{val.difficulty}</td>
                        <td>{val.instructions}</td>
                        <td>{val.reps}</td>
                        <td>{val.sets}</td>
                        <button className="update"><Link to={`/workouts/update/${val.workoutid}`}>Update</Link></button>
                        <button className="delete" onClick={()=>handleDelete(val.workoutid)}>Delete</button>
                    </tr>
                )
            })}
            </table>
        </div>
        <button><Link to="/workouts/add">Add</Link></button>
    </div>
  )
}
// TODO: add a button for adding a workout to a user's profile
export default Workouts