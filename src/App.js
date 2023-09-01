import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Registration/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
