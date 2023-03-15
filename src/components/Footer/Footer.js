import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import image from "../../../src/DEBSOClogowhitePNG.png";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();

  React.useEffect(() => {
    const images = {
      "/question": "/question.jpg",
      "/": "/Final2.jpg",
      "/leaderboard": "/leader.jpg",
      "/theme": "../../bgimage.jpg",
    };

    const bg = images[location.pathname] || images["/"];
    const bg_elem = document.getElementById("bg");
    if (bg_elem) {
      bg_elem.style.background = `url(${bg})`;
      bg_elem.style.backgroundPosition = "center";
      bg_elem.style.backgroundSize = "cover";
      bg_elem.style.backgroundRepeat = "no-repeat";
    }
  }, [location.pathname]);

  return (
    <div className={styles.icons}>
      <a
        href="https://www.youtube.com/channel/UCx7ixKEIib3ikQd_QBEY9Qw"
        className={styles.youtube}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a
        href="https://m.facebook.com/debatingsociety3103.nitd/"
        className={styles.facebook}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://www.debsocnitdgp.in/" target="_blank" rel="noreferrer">
        <img className={styles.logods} src={image} alt="ds-logo" />
      </a>

      <a
        href="https://www.instagram.com/debsocnitd/"
        className={styles.instagram}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a
        href="https://github.com/debsocnitdgp"
        className={styles.github}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
    </div>
  );
};

export default Footer;
