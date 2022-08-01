import React from 'react';
import Navbar from"./components/Navbar.js";
import Landing from './components/Landing.js';
import Question from './components/Question/Question.js';
import Leaderboard from './components/Leaderboard/Leaderboard.js';
// import Logo from './components/Logos/Logo.js';
import Login from './components/Login/Login.js';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <div className="bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/question" element={<Question />} />

          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/signin" element={<Login />}  />

          {}
          </Routes>
     
      </div>
    </Router>
  );

  
}


export default App;
