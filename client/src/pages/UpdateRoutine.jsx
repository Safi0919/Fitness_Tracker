import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const UpdateRoutine = () => {
    const [routine, setRoutine] = useState({
      routinename:""
    });

    const [workouts, setworkouts] = useState([]);
    const [checkedWorkoutIds, setCheckedWorkoutIds] = useState([])

    const navigate = useNavigate()
    const location = useLocation();
    const routineid = location.pathname.split("/")[3];

    // Fetch all workouts  to add to routine
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

    // Fetch the previous routine name
    useEffect(() => {
        const fetchRoutine = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8800/routines/${routineid}`
            );
            setRoutine(response.data);
          } catch (err) {
            console.error("Failed to fetch routine", err);
          }
        };

        fetchRoutine();
      }, [routineid]);

    console.log(location.pathname.split("/")[3]);

    const handleChange = (e) =>{
        setRoutine(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleCheckboxChange = (id) => {
      // Toggle the workout ID in the list of checked IDs
      console.log("Checkbox with ID", id, "changed");
      setCheckedWorkoutIds(prevIds => {
          if (prevIds.includes(id)) {
              return prevIds.filter(workoutId => workoutId !== id);
          } else {
              return [...prevIds, id];
          }
      });
  };

    const handleClick = async (e) => {
      e.preventDefault();
      try {
        // Update routine name
        const routineResponse = await axios.put(
          `http://localhost:8800/routines/${routineid}`, routine
        );
        console.log(routineResponse);

        // Update the workouts associated with the routine
        if (checkedWorkoutIds.length > 0) {
          await axios.put(
            `http://localhost:8800/routines/${routineid}/workouts`,
            { workoutIds: checkedWorkoutIds }
          );
        }

        navigate("/users");
      } catch (err) {
        console.error("Error updating routine or adding workouts: ", err);
      }
    };


    console.log(routine);

  return (
    <div>
        <h1>Update Routine</h1>
        <input type="text" placeholder='name' onChange={handleChange} name="routinename"/>
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
                <th>Add to Routine?</th>
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
                        <td><input type="checkbox" onChange={() => handleCheckboxChange(val.workoutid)}/> Add to Routine</td>
                    </tr>
                )
            })}
            </table>
        </div>
        <button onClick={handleClick}>Update Routine</button>
    </div>
  )

}

export default UpdateRoutine