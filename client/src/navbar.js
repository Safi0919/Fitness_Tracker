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
    <header className="fixed top-0 left-0 z-50 w-full bg-gray-950 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a className="flex items-center gap-2 font-bold text-white" href="/">
          <h1 className="text-white transition-colors hover:text-gray-300 text-lg">
            WorkMan
          </h1>
        </a>
        {isLoggedIn && (
          <nav className="flex items-center justify-center gap-4 md:gap-6">
            <NavLink
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
              to="/users"
            >
              Profile
            </NavLink>
            <NavLink
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
              to="/routines"
            >
              Routines
            </NavLink>
            <NavLink
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
              to="/workouts"
            >
              Workouts
            </NavLink>
            <NavLink
              className="text-sm font-medium text-white transition-colors hover:text-gray-300"
              to="/"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
