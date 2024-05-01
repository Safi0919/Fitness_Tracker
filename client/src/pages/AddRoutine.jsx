import { React, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddRoutine = () => {
    const userId = localStorage.getItem('userid')
    console.log(userId)
    const [routine, setRoutine] = useState({
      routinename:""
    });

    const [workouts, setworkouts] = useState([]);
    const [checkedWorkoutIds, setCheckedWorkoutIds] = useState([])

    // Fetch all workouts in DB that can be added to routine
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

    const navigate = useNavigate()

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
      // Create routine and retrieve the routine ID created
      const routineResponse = await axios.post(
        "http://localhost:8800/routines",
        routine
      );
      console.log(routineResponse);
      const routineId = routineResponse.data.id;

      // Associate the routine with the logged-in user
      await axios.post(
        `http://localhost:8800/users_to_routines`,
        { userId: userId, routineId: routineId }
      );

      // Assuming you are associating workouts immediately after creating the routine
      if (checkedWorkoutIds.length > 0) {
        await axios.post(
          `http://localhost:8800/routines/${routineId}/workouts`,
          { workoutIds: checkedWorkoutIds }
        );
      }

      navigate("/users");
    } catch (err) {
      console.error("Error creating routine or adding workouts: ", err);
    }
  };


    console.log(routine);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 my-4">
        Create New Routine
      </h1>
      <input
        type="text"
        placeholder="Enter the Routine name"
        onChange={handleChange}
        name="routinename"
        className="input-style mb-4"
      />
      <div
        className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        style={{ maxHeight: "1000px", overflowY: "auto" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Workout Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Muscle Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Add to Routine?
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workouts.map((workout, key) => (
              <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {workout.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {workout.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {workout.muscle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {workout.difficulty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {workout.reps}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {workout.sets}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {workout.instructions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(workout.workoutid)}
                    checked={checkedWorkoutIds.includes(workout.workoutid)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleClick}
        className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black mt-5"
      >
        Create Routine
      </button>
      <div className="text-med text-gray-900 mt-5">
        {/* Display checked workout IDs for debugging */}
        Checked workout IDs: {checkedWorkoutIds.join(", ")}
      </div>
    </div>
  );

}

export default AddRoutine