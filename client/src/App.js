import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Workouts from "./pages/Workouts";
import Update from "./pages/Update";
import Add from "./pages/Add";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Workouts/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
