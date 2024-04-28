import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Workouts from "./pages/Workouts";
import Update from "./pages/Update";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>}></Route>
          <Route path="/workouts" element={<Workouts/>}/>
          <Route path="/routines" element={<Workouts/>}/>
          <Route path="/workouts/add" element={<Add/>}/>
          <Route path="/workouts/update/:id" element={<Update/>}/>
          <Route path=":id/" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
