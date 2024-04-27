import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Workouts from "./pages/Workouts";
import Update from "./pages/Update";
import Add from "./pages/Add";
import Home from "./pages/Home";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/workouts" element={<Workouts/>}/>
          <Route path="/workouts/add" element={<Add/>}/>
          <Route path="/workouts/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
