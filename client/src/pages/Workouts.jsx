import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Workouts = () => {
  const [workouts, setworkouts] = useState([]);
  const tableHeaderClass =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const columnHeaderClass =
    "px-6 py-4 whitespace-normal text-sm font-medium text-gray-900";

  // This fetches all the workouts present in the database
  useEffect(() => {
    const fetchAllWorkouts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/workouts");
        console.log(res);
        setworkouts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllWorkouts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2 mt-4">
        Workouts
      </h1>
      <div className="py-4">
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
                  Reps
                </th>
                <th scope="col" className={tableHeaderClass}>
                  Sets
                </th>
                <th scope="col" className={tableHeaderClass}>
                  Instructions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workouts.map((val, key) => (
                <tr key={key}>
                  <td className={columnHeaderClass}>{val.name}</td>
                  <td className={columnHeaderClass}>{val.type}</td>
                  <td className={columnHeaderClass}>{val.muscle}</td>
                  <td className={columnHeaderClass}>{val.difficulty}</td>
                  <td className={columnHeaderClass}>{val.reps}</td>
                  <td className={columnHeaderClass}>{val.sets}</td>
                  <td className={columnHeaderClass}>{val.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black">
        <Link to="/workouts/add" className="block w-full h-full">
          Add Workout
        </Link>
      </button>
      <button className="inline-block bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black mt-5 ml-4">
        <Link to="/users">Back to Profile</Link>
      </button>
    </div>
  );
};

export default Workouts;
