import { Link, NavLink } from "react-router-dom"

// Navigation Bar
// Add any active links inside <ul>
export default function Navbar() {
    return (
    <nav className="nav">
        <Link to="/" className="site-title">
            Fitness Tracker
        </Link>

        <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        </ul>
    </nav>
    )
}