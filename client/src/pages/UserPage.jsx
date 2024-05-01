import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, Route, Routes } from 'react-router-dom'
import RoutinePage from './RoutinePage'
//import RoutinePage from './RoutinePage'

const UserPage = () => {
    const userId = localStorage.getItem('userid');
    const [user, setUser] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [routines, setRoutines] = useState([]);

    // Retrieves current user information
    useEffect(()=>{
        const fetchCurrentUser = async () =>{
            try{
                const res = await axios.get(`http://localhost:8800/users/${userId}`);
                console.log(res);
                setUser(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchCurrentUser();
    },[userId])

    // Retrieves user's workouts
    useEffect(() => {
        const fetchUserWorkouts = async () => {
          try {
            // Fetch routines associated with the logged-in user's ID
            const res = await axios.get(`http://localhost:8800/workouts/user/${userId}`);
            setWorkouts(res.data);
            //console.log(userId)
          } catch (err) {
            console.log(err);
          }
        };
        fetchUserWorkouts();
      }, [userId]); // Fetch routines when the user data changes

      const deleteWorkout = async (id)=>{
        try {
            await axios.delete("http://localhost:8800/workouts/"+id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
      }

    // Retrieves user's routines
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
      }, [userId]); // Fetch routines when the user data changes

      const deleteRoutine = async (id)=>{
        try {
            await axios.delete("http://localhost:8800/routines/"+id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
      }

  return (
    <div>
    <h1>Welcome, {user.username}!</h1>
    <div>
        {user && (
            <div className="user">
                <h2>Email: {user.email}</h2>
                <h2>Phone #: {user.phoneNum}</h2>
                {/*<h2>Password: {user.password}</h2>*/}
                {/*<button className="navigate"><Link to={`${user.username}/`}>Navigate</Link></button> */}
            </div>
        )}
    </div>

    <div>
        <h1>Your Routines</h1>
        <div className="routine">
          {routines.map(routine => (
            <div className="routine" key={routine.routineid}>
              <Link to={`/routines/${routine.routineid}`}>
                <h2 className="routine-title">{routine.routinename}</h2>
              </Link>
              <button className="delete" onClick={() => deleteRoutine(routine.routineid)}>Delete</button>
              <button className="update"><Link to={`/routines/update/${routine.routineid}`}>Update</Link></button>
            </div>
          ))}
        </div>
        <button><Link to="/routines/add">Add</Link></button>
      </div>
    {/* Add RoutinePage route */}

    <h1>Your Workouts</h1>
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
                    <th>Action</th>
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
                        <td>
                            <button className="update">
                                <Link to={`/workouts/update/${val.workoutid}`}>Update</Link>
                            </button>
                            <button className="delete" onClick={() => deleteWorkout(val.workoutid)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <button><Link to="/workouts/add">Add</Link></button>
</div>
  )
}

export default UserPage