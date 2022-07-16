import React from 'react';
import Navbar from"./components/Navbar.js";
// import Landing from './components/Landing.js';
// import Question from './components/Question/Question.js';
import Leaderboard from './components/Leaderboard/Leaderboard.js';
import './App.css';


const App = () => {
  return < div className='bg' >
    <Navbar /> 
  {/* <Landing /> */}
  {/* <Question />  */}
   <Leaderboard />
  </div>

  
}


export default App;
