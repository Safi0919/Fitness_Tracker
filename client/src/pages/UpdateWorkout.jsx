import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Update = () => {
    const [workout, setWorkout] = useState({
      name:"",
      type:"",
      muscle:"",
      difficulty:"",
      instructions:"",
      reps:null,
      sets:null
    });

    const navigate = useNavigate();
    const location = useLocation();

    const workoutid = location.pathname.split("/")[3];

    console.log(location.pathname.split("/")[3]);

    // code to fetch the current data to be updated

     useEffect(() => {
       const fetchWorkout = async () => {
         try {
           const response = await axios.get(
             `http://localhost:8800/workouts/${workoutid}`
           );
           setWorkout(response.data);
         } catch (err) {
           console.error("Failed to fetch workout", err);
         }
       };

       fetchWorkout();
     }, [workoutid]);

    const handleChange = (e) =>{
        setWorkout(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8800/workouts/${workoutid}`, workout)
            console.log(res)
            navigate("/users")
        } catch (err) {
          console.log(err);
        }
    }

    console.log(workout);
  return (
        <div>
            <h1>Update Workout</h1>
            <input type="text" placeholder='Name' value={workout.name} onChange={handleChange} name="name" />
            <input type="text" placeholder='Type' value={workout.type} onChange={handleChange} name="type" />
            <input type="text" placeholder='Muscle' value={workout.muscle} onChange={handleChange} name="muscle" />
            <input type="text" placeholder='Difficulty' value={workout.difficulty} onChange={handleChange} name="difficulty" />
            <input type="number" placeholder='Reps' value={workout.reps || ''} onChange={handleChange} name="reps" />
            <input type="number" placeholder='Sets' value={workout.sets || ''} onChange={handleChange} name="sets" />
            <input type="text" placeholder='Instructions' value={workout.instructions} onChange={handleChange} name="instructions" />
            <button onClick={handleClick}>Update</button>
        </div>
    );
}

export default Update;