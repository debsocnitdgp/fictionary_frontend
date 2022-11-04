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

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <a href="https://www.debsocnitdgp.in/" target="_blank" rel="noreferrer">
          <img className={styles.logods} src={image} alt="ds-logo" />
        </a>
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
    </div>
  );
};

export default Footer;
