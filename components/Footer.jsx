import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Oracle Deck All rights reserved</p>
      <p className="icons">
        <AiFillInstagram
          onClick={() => (window.location = "http://youtube.com")}
        ></AiFillInstagram>
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
