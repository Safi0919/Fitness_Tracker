import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserPage = () => {
  const userId = localStorage.getItem("userid");
  const [user, setUser] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:8800/users/${userId}`
        );
        setUser(userRes.data);
        const workoutsRes = await axios.get(
          `http://localhost:8800/workouts/user/${userId}`
        );
        setWorkouts(workoutsRes.data);
        const routinesRes = await axios.get(
          `http://localhost:8800/routines/user/${userId}`
        );
        setRoutines(routinesRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/workouts/${id}`);
      setWorkouts(workouts.filter((workout) => workout.workoutid !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoutine = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/routines/${id}`);
      setRoutines(routines.filter((routine) => routine.routineid !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <h1 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Welcome, {user.username}!
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Profile Information
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.phoneNum}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Your Routines
      </h2>
      {routines.map((routine) => (
        <div
          key={routine.routineid}
          className="bg-white p-6 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <Link to={`/routines/${routine.routineid}`}>
            <h2 className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black">
              {routine.routinename}
            </h2>
          </Link>
          <div>
            <Link
              to={`/routines/update/${routine.routineid}`}
              className="bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold py-1 px-5 rounded mr-2"
            >
              Update
            </Link>
            <button
              onClick={() => deleteRoutine(routine.routineid)}
              className="bg-red-500 inline-block hover:bg-red-700 text-white font-bold py-1 px-5 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <Link
        to="/routines/add"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Routine
      </Link>

      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Your Workouts
      </h2>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-6">
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workouts.map((workout, key) => (
              <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {workout.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workout.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workout.muscle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workout.difficulty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workout.reps}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workout.sets}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                  {workout.instructions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/workouts/update/${workout.workoutid}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteWorkout(workout.workoutid)}
                    className="text-red-600 hover:text-red-900 ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to="/workouts/add"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Workout
      </Link>
    </div>
  );
};

export default UserPage;
