import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Intro,
  Workouts,
  UpdateWorkout,
  AddWorkout,
  UserPage,
  Routines,
  AddRoutine,
  UpdateRoutine,
  Register,
  Login,
} from "./pages/Pages.js";
import Navbar from "./navbar";
import { AuthContext } from "./AuthContext";
import "./style.css";
import "./pages/main.css";
import RoutinePage from "./pages/RoutinePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userid");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (userid) {
      setIsLoggedIn(true);
    }
  }, []);

  // Takes care of navigation between pages
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <>
        <Navbar />
        <div>
          <Routes>
            {isLoggedIn ? (
              <>
                {/* If user is logged in, these pages could be accessed */}
                <Route path="/" element={<UserPage />} />
                <Route path="/login" element={<UserPage />} />\
                <Route path="/register" element={<UserPage />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/routines" element={<Routines />} />
                <Route path="/workouts/add" element={<AddWorkout />} />
                <Route path="/routines/add" element={<AddRoutine />} />
                <Route
                  path="/routines/update/:id"
                  element={<UpdateRoutine />}
                />
                <Route
                  path="/workouts/update/:id"
                  element={<UpdateWorkout />}
                />
                <Route path="/routines/:id" element={<RoutinePage />} />
                <Route path="*" element={<UserPage />} />
              </>
            ) : (
              <>
                {/* If user is NOT logged in, these pages could be accessed */}
                <Route path="*" element={<Intro />} />
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </div>
      </>
    </AuthContext.Provider>
  );
}

export default App;
