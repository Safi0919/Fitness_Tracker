import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import UpdateWorkout from "./pages/UpdateWorkout";
import Add from "./pages/Add";
import UserPage from "./pages/UserPage";
import Profile from "./pages/Profile";
import Routines from "./pages/Routines";
import AddRoutine from "./pages/AddRoutine"
import UpdateRoutine from "./pages/UpdateRoutine"
import "./style.css"
import Navbar from "./navbar";
import { AuthContext } from "./AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userid');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const userid = localStorage.getItem('userid');
    if (userid) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            {isLoggedIn ? (
              <>
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/routines" element={<Routines />} />
                <Route path="/workouts/add" element={<Add />} />
                <Route path="/routines/add" element={<AddRoutine/>}/>
                <Route path="/routines/update/:id" element={<UpdateRoutine/>}/>
                <Route path="/workouts/update/:id" element={<UpdateWorkout/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<UserPage />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </div>
      </>
    </AuthContext.Provider>
  );
}

export default App;
