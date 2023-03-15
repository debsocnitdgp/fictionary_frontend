import React from "react";
import "./Theme.css";
import { useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

import image from "../w1.jpg";
import image1 from "../w2.jpg";
import image2 from "../w3.jpg";
import image3 from "../w4.jpg";
import image5 from "../w5.jpg";

import { useGlitch } from "react-powerglitch";

const Test = () => {
  const glitch = useGlitch();
  return (
    <div className="Container">
      <h2 className="theme-head" ref={glitch.ref}>
        Themes
      </h2>

      <div className="main-card">
        <div className="card-1">
          <Flippy
            // flipOnHover={true}
            // flipOnClick={false}
            flipDirection="horizontal"
            
          >
            <FrontSide>
              <img className="image-1" src={image1}></img>
            </FrontSide>
            <BackSide>
              <img className="image-1" src={image2}></img>
            </BackSide>
          </Flippy>
          <p className="p-theme" ref={glitch.ref}>
            Romance
          </p>
        </div>

        <div className="card-1">
          <img className="image-1" src={image2}></img>
          <p className="p-theme" ref={glitch.ref}>
            Sci-Fi
          </p>
        </div>
        <div className="card-1">
          <img className="image-1" src={image3}></img>
          <p className="p-theme" ref={glitch.ref}>
            Sci-Fi
          </p>
        </div>
        <div className="card-1">
          <img className="image-1" src={image5}></img>
          <p className="p-theme" ref={glitch.ref}>
            Sci-Fi
          </p>
        </div>
      </div>
      {/* <div className="main-card">
        <div className="card-1">
          <img className="image-1" src={image3}></img>
          <p className="p-theme" ref={glitch.ref}>
            Horror
          </p>
        </div>

        <div className="card-1">
          <img className="image-1" src={image5}></img>
          <p className="p-theme" ref={glitch.ref}>
            Comedy
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Test;
