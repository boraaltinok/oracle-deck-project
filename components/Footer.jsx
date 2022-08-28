import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Oracle Deck All rights reserved</p>
      <p className="icons">
        <AiFillInstagram>
          <a href="http://youtube.com"></a>
        </AiFillInstagram>
        <AiOutlineTwitter />
      </p>
      <p>
        Follow me on Facebook and Instagram @HHBHannah</p>
        <p> For more information on
        how to work with me privately you can visit holistichealingbyhannah.com
        Free discovery calls are available, if you have questions before booking
        an appointment.
      </p>
    </div>
  );
};

export default Footer;
