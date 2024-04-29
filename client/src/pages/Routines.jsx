import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Routines = () => {
  const [routines, setroutines] = useState([]);

  useEffect(()=>{
    const fetchAllRoutines = async () =>{
        try{
            const res = await axios.get("http://localhost:8800/routines");
            console.log(res);
            setroutines(res.data);
        }catch(err){
            console.log(err);
        }
    }
    fetchAllRoutines();
  },[])

  const handleDelete = async (id)=>{
    try {
        await axios.delete("http://localhost:8800/routines/"+id);
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>
        <h1>Routines</h1>
        <div className="routine">
            {routines.map(routine=>(
                <div className="routine">
                    <h2>{routine.routinename}</h2>
                    <button className="delete" onClick={()=>handleDelete(routine.routineid)}>Delete</button>
                    <button className="update"><Link to={`/routines/update/${routine.routineid}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button><Link to="/routines/add">Add</Link></button>
    </div>
  )
}

export default Routines