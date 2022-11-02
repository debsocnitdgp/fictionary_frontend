import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import Landing from "./components/Landing.js";
import Question from "./components/Question/Question.js";
import Leaderboard from "./components/Leaderboard/Leaderboard.js";
import Login from "./components/Login/Login.js";
import { login } from "./utils/tokenSlice";
// import Logo from './components/Logos/Logo.js';
import Footer from "./components/Footer/Footer.js"

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarResponsive from "./components/NavbarResponsive.js";
import { useDispatch } from "react-redux";

const App = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  window.addEventListener('load', () => {
    var token = localStorage.getItem('fictionary_token');
    if(token){ dispatch(login(token)); }
  })
  

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
        <Footer />
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
