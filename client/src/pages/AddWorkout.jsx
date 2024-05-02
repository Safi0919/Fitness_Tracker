import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Add = () => {
  const userId = localStorage.getItem("userid");
  const [workout, setWorkout] = useState({
    name: "",
    type: "",
    muscle: "",
    difficulty: "",
    instructions: "",
    reps: null,
    sets: null,
  });
  const [isActive, setIsActive] = useState(false);

  const inputStyle =
    "bg-white text-gray-600 border border-black rounded w-full py-2 px-3 mb-4";

  const handleChange = (e) => {
    setWorkout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // This POSTS/inserts the data into the table
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/workouts", workout);
      if (res.data && res.data.id) {
        const workoutId = res.data.id;
        await axios.post(`http://localhost:8800/workouts_to_users`, {
          userId,
          workoutId,
        });
        // This changes the button's font for 3 seconds
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to add workout: ", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <h1 className="text-2xl font-semibold text-gray-900 mt-12 mb-8">
        Add new workout
      </h1>

      <form className="space-y-200">
        <input
          type="text"
          placeholder="name"
          onChange={handleChange}
          name="name"
          className={inputStyle}
        />
        <input
          type="text"
          placeholder="type"
          onChange={handleChange}
          name="type"
          className={inputStyle}
        />
        <input
          type="text"
          placeholder="muscle"
          onChange={handleChange}
          name="muscle"
          className={inputStyle}
        />
        <input
          type="text"
          placeholder="difficulty"
          onChange={handleChange}
          name="difficulty"
          className={inputStyle}
        />
        <input
          type="number"
          placeholder="reps"
          onChange={handleChange}
          name="reps"
          className={inputStyle}
        />
        <input
          type="number"
          placeholder="sets"
          onChange={handleChange}
          name="sets"
          className={inputStyle}
        />
        <input
          type="text"
          placeholder="instructions"
          onChange={handleChange}
          name="instructions"
          className={inputStyle}
        />
        <button
          onClick={handleClick}
          className={`font-bold py-2 px-4 rounded transition-colors duration-300 border ${
            isActive
              ? "bg-black text-white"
              : "bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black"
          }`}
        >
          {isActive ? "Workout Added!" : "Add this Workout"}
        </button>
      </form>

      <button className="mt-5 bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300 border border-black">
        <Link to="/workouts">Back to Workouts Page!</Link>
      </button>
    </div>
  );
};

export default Add;
