import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoutinePage = () => {
    const { id } = useParams();
    const [routineName, setRoutineName] = useState("");
    const [workouts, setWorkouts] = useState([]);

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
        <div>
            <h1>Routine: {routineName}</h1>
            <div className="workouts">
            <table>
                <tbody>
                    <tr>
                        <th>Workout Name</th>
                        <th>Type</th>
                        <th>Muscle Group</th>
                        <th>Difficulty</th>
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Instructions</th>
                    </tr>
                    {workouts.map((val, key) => (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.type}</td>
                            <td>{val.muscle}</td>
                            <td>{val.difficulty}</td>
                            <td>{val.reps}</td>
                            <td>{val.sets}</td>
                            <td>{val.instructions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
          </div>
    );
};

export default RoutinePage;
