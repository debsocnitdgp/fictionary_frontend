import React, { useState } from "react";
import Navbar from "../components/Navbar.js";
import Landing from "./Landing.js";
import Question from "./Question/Question.js";
import Leaderboard from "./Leaderboard/Leaderboard.js";
import Login from "./Login/Login.js";
import GameOver from "./GameOver/GameOver.js";
import Footer from "../components/Footer/Footer.js";

import "./App.css";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarResponsive from "../components/NavbarResponsive.js";

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
      <div className="bg" id="bg">
        <NavbarResponsive hideNav={hideNav} nav={nav} />
        <Navbar showNav={showNav} />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/question" element={<Question />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/game-finished" element={<GameOver />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
