import './App.css';
import MapPage from "./components/MapPage";
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route element={<MapPage />} exact path="*" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<RegistrationPage />} path="/registration" />
            </Routes>
        </Router>
    </div>
  );
}

export default App;



