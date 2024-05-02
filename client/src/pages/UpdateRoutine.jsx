import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
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

    const tableHeaderClass =
      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
    
    const tableContentClass =
      "px-6 py-4 whitespace-normal text-sm text-gray-900";

    // This fetches all workouts to be potentially added to the particular routine
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

    // Fetches the name of the previous routine name
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

    // Handles the trigger for the change in checkbox state
    const handleCheckboxChange = (id) => {
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
        // Update the routine name with new name
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 my-6">
        Update Routine
      </h1>
      <input
        type="text"
        placeholder="Enter the Routine name here"
        onChange={handleChange}
        name="routinename"
        className="form-input block w-full px-3 py-2 mb-4 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className={tableHeaderClass}>
                      Workout Name
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Type
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Muscle Group
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Difficulty
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Instructions
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Reps
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Sets
                    </th>
                    <th scope="col" className={tableHeaderClass}>
                      Add to Routine?
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workouts.map((val, key) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {val.name}
                      </td>
                      <td className={tableContentClass}>{val.type}</td>
                      <td className={tableContentClass}>{val.muscle}</td>
                      <td className={tableContentClass}>{val.difficulty}</td>
                      <td className={tableContentClass}>{val.instructions}</td>
                      <td className={tableContentClass}>{val.reps}</td>
                      <td className={tableContentClass}>{val.sets}</td>
                      <td className={tableContentClass}>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(val.workoutid)}
                          checked={checkedWorkoutIds.includes(val.workoutid)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black mt-8"
      >
        Update Routine
      </button>
      <button className="inline-block bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black mt-5 ml-4">
        <Link to="/users">Back to Profile</Link>
      </button>
    </div>
  );
};


export default UpdateRoutine