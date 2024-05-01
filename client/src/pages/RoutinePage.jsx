import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const RoutinePage = () => {
    const { id } = useParams();
    const [routineName, setRoutineName] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const tableHeaderClass =
      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
    const columnHeaderClass =
      "px-6 py-4 whitespace-normal text-sm font-medium text-gray-900";

    useEffect(() => {
        const fetchRoutineData = async () => {
            try {
                // Fetch routine data based on the ID from the URL params
                const res = await axios.get(`http://localhost:8800/routines/workouts/${id}`);
                setRoutineName(res.data.routineName);
                setWorkouts(res.data.workouts || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoutineData();
    }, [id]);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 mt-4">
          Routine: {routineName}
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
                  <tr key={key} className="bg-white divide-y divide-gray-200">
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
          <Link to="/user" className="block w-full h-full">
            Back to Profile
          </Link>
        </button>
      </div>
    );
};

export default RoutinePage;
