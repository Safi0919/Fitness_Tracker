import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
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

    const handleChange = (e) =>{
        setWorkout(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/workouts/" + workoutid, workout)
        } catch (err) {
          console.log(err);
        }
    }

    console.log(workout);
  return (
    <div>
        <h1>Update workout</h1>
        <input type="text" placeholder='name' onChange={handleChange} name="name"/>
        <input type="text" placeholder='type' onChange={handleChange} name="type"/>
        <input type="text" placeholder='muscle' onChange={handleChange} name="muscle"/>
        <input type="text" placeholder='difficulty' onChange={handleChange} name="difficulty"/>
        <input type="text" placeholder='instructions' onChange={handleChange} name="instructions"/>
        <input type="number" placeholder='reps' onChange={handleChange} name="reps"/>
        <input type="number" placeholder='sets' onChange={handleChange} name="sets"/>
        <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update