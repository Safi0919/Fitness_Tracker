import {
  Routes,
  Route,
} from "react-router-dom"
import Workouts from "./pages/Workouts";
import Update from "./pages/Update";
import Add from "./pages/Add";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Routines from "./pages/Routines";
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
          <Route path="/workouts/update/:id" element={<Update/>}/>
          <Route path=":id/" element={<Profile/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;
