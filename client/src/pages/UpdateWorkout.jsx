import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Update = () => {
  const [workout, setWorkout] = useState({
    name: "",
    type: "",
    muscle: "",
    difficulty: "",
    instructions: "",
    reps: null,
    sets: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const workoutid = location.pathname.split("/")[3];

  console.log(location.pathname.split("/")[3]);

  // This code fetches the current data to be updated

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

  const handleChange = (e) => {
    setWorkout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // This PUTS/updates the data into the MySQLWorkbench.
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/workouts/${workoutid}`,
        workout
      );
      console.log(res);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(workout);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Update Workout
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <form className="space-y-4">
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Name"
            value={workout.name}
            onChange={handleChange}
            name="name"
          />
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Type"
            value={workout.type}
            onChange={handleChange}
            name="type"
          />
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Muscle"
            value={workout.muscle}
            onChange={handleChange}
            name="muscle"
          />
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Difficulty"
            value={workout.difficulty}
            onChange={handleChange}
            name="difficulty"
          />
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Reps"
            value={workout.reps || ""}
            onChange={handleChange}
            name="reps"
          />
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Sets"
            value={workout.sets || ""}
            onChange={handleChange}
            name="sets"
          />
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            placeholder="Instructions"
            value={workout.instructions}
            onChange={handleChange}
            name="instructions"
          />
          <button
            className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black mt-8"
            onClick={handleClick}
          >
            Update
          </button>
          <button className="inline-block bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black mt-5 ml-4">
            <Link to="/users">Back to Profile</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;