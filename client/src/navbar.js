import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogout = () => {
        console.log(localStorage.getItem('userid'));
        localStorage.setItem('userid', null);
        console.log(localStorage.getItem('userid'));
        logout();
    };

    return (
        <nav className="nav">
            <NavLink to="/" className="site-title">
                Fitness Tracker
            </NavLink>

            {isLoggedIn && (
                <ul>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/routines">Routines</NavLink>
                    <NavLink to="/workouts">Workouts</NavLink>
                    {/* Use handleLogout function when logout is clicked */}
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </ul>
            )}
        </nav>
    );
}
