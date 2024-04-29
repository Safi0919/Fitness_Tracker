import {
  Routes,
  Route,
} from "react-router-dom"
import Workouts from "./pages/Workouts";
import UpdateWorkout from "./pages/UpdateWorkout";
import Add from "./pages/Add";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Routines from "./pages/Routines";
import AddRoutine from "./pages/AddRoutine"
import UpdateRoutine from "./pages/UpdateRoutine"
import "./style.css"
import Navbar from "./navbar";

function App() {
  return (
    <>
    <Navbar />
    <div className="container">
        <Routes>
          <Route path="/" element={<Welcome/>}></Route>
          <Route path="/workouts" element={<Workouts/>}/>
          <Route path="/routines" element={<Routines/>}/>
          <Route path="/workouts/add" element={<Add/>}/>
          <Route path="/routines/add" element={<AddRoutine/>}/>
          <Route path="/routines/update/:id" element={<UpdateRoutine/>}/>
          <Route path="/workouts/update/:id" element={<UpdateWorkout/>}/>
          <Route path=":id/" element={<Profile/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;
