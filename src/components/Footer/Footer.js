import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <a
          href="https://www.youtube.com/channel/UCx7ixKEIib3ikQd_QBEY9Qw"
          className={styles.youtube}
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a
          href="https://m.facebook.com/debatingsociety3103.nitd/"
          className={styles.facebook}
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>

        <a
          href="https://www.instagram.com/debsocnitd/"
          className={styles.instagram}
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
