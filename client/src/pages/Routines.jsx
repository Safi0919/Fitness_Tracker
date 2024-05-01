import { React, useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchUserRoutines = async () => {
      try {
        // Fetch routines associated with the logged-in user's ID
        const userId = localStorage.getItem('userid');
        const res = await axios.get(`http://localhost:8800/routines/user/${userId}`);
        setRoutines(res.data);
        //console.log(userId)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserRoutines();
  }, []); // Fetch routines when the user data changes

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
                <div className="routine" key={routine.routineid}>
                <Link to={`/routines/${routine.routineid}`}>
                  <h2 className="routine-title">{routine.routinename}</h2>
                </Link>
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