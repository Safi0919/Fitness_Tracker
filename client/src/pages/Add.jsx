import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Add = () => {
    const [workout, setWorkout] = useState({
      name:"",
      type:"",
      muscle:"",
      difficulty:"",
      instructions:"",
      reps:null,
      sets:null
    });

    const handleChange = (e) =>{
        setWorkout(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
          await axios.post("http://localhost:8800/workouts", workout)
        } catch (err) {
          console.log(err);
        }
    }

    console.log(workout);
  return (
    <div>
        <h1>Add new workouts</h1>
        <input type="text" placeholder='name' onChange={handleChange} name="name"/>
        <input type="text" placeholder='type' onChange={handleChange} name="type"/>
        <input type="text" placeholder='muscle' onChange={handleChange} name="muscle"/>
        <input type="text" placeholder='difficulty' onChange={handleChange} name="difficulty"/>
        <input type="text" placeholder='instructions' onChange={handleChange} name="instructions"/>
        <input type="number" placeholder='reps' onChange={handleChange} name="reps"/>
        <input type="number" placeholder='sets' onChange={handleChange} name="sets"/>
        <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add