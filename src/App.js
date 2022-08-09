import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import Landing from "./components/Landing.js";
import Question from "./components/Question/Question.js";
import Leaderboard from "./components/Leaderboard/Leaderboard.js";
import Login from "./components/Login/Login.js";
// import Logo from './components/Logos/Logo.js';

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarResponsive from "./components/NavbarResponsive.js";

const App = () => {
  const [nav, setNav] = useState(false);

  const showNav = () => {
    setNav(true);
  };
  const hideNav = () => {
    setNav(false);
  };

  return (
    <Router>
      <div className="bg">
        <NavbarResponsive hideNav={hideNav} nav={nav} />
        <Navbar showNav={showNav} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/question" element={<Question />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
