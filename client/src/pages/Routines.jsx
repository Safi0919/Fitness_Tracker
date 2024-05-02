import { React, useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchUserRoutines = async () => {
      try {
        // Fetch routines associated with the logged-in user's ID
        const userId = localStorage.getItem("userid");
        const res = await axios.get(
          `http://localhost:8800/routines/user/${userId}`
        );
        setRoutines(res.data);
        //console.log(userId)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserRoutines();
  }, []); // Fetch routines when the user data changes

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/routines/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 my-6">Routines</h1>
      <div className="space-y-4">
        {routines.map((routine) => (
          <div
            key={routine.routineid}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <Link to={`/routines/${routine.routineid}`}>
                <h2 className="text-lg font-medium text-gray-800">{routine.routinename}</h2>
              </Link>

            <div>
              <Link
                to={`/routines/update/${routine.routineid}`}
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded mr-2"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(routine.routineid)}
                className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded mr-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/routines/add"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 block text-center"
      >
        Add Routine
      </Link>
    </div>
  );
};

export default Routines;
