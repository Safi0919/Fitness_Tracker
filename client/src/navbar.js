import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    console.log(localStorage.getItem("userid"));
    logout();
  };

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-gray-900">
      <div className="mx-auto">
        {" "}
        {/* This will center the title horizontally */}
        <NavLink
          to="/"
          className="text-white font-bold text-lg hover:text-gray-300 transition-colors"
        >
          WorkMan
        </NavLink>
      </div>

      {isLoggedIn && (
        <ul className="flex gap-4">
          {" "}
          {/* This adds horizontal spacing between links */}
          <li>
            <NavLink
              to="/users"
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/routines"
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
            >
              Routines
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/workouts"
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
            >
              Workouts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={handleLogout}
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );

}
