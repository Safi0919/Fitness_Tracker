import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import "./pages/main.css";

export default function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogout = () => {
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
                    <NavLink to="/users">Profile</NavLink>
                    <NavLink to="/routines">Routines</NavLink>
                    <NavLink to="/workouts">Workouts</NavLink>
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </ul>
            )}
        </nav>
    );
}
