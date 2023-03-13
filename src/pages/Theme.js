import React from "react";
import "./Theme.css";
import image from "../w1.jpg";
import { useGlitch } from "react-powerglitch";

const Test = () => {
  const glitch = useGlitch();
  return (
    <div className="Container">
      <div className="head">
        <h2 ref={glitch.ref}>Themes</h2>
      </div>
      <div className="main-card">
        <div className="card-1">
          <img className="image-1" src={image}></img>
          <p ref={glitch.ref}> Romance</p>
        </div>

        <div className="card-1">
          <img className="image-1" src={image}></img>
          <p ref={glitch.ref}>Romance</p>
        </div>
      </div>
      <div className="main-card">
        <div className="card-1">
          <img className="image-1" src={image}></img>
          <p ref={glitch.ref}> Romance</p>
        </div>

        <div className="card-1">
          <img className="image-1" src={image}></img>
          <p ref={glitch.ref}>Romance</p>
        </div>
      </div>
    </div>
  );
};

export default Test;
