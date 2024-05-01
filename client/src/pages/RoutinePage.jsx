import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Unfinished
const RoutinePage = ({ match }) => {
  const routineId = match.params.routineId;
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/workouts/routine/${routineId}`);
        setWorkouts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorkouts();
  }, [routineId]);

  return (
    <div>
      <h1>Workouts for Routine {routineId}</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.workoutId}>{workout.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoutinePage;
