import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = ({ pageContent }) => {
  return (
    <div className="footer-container">
      {pageContent === undefined ? (
        <>
          <p>
            {pageContent.footer1 === undefined
              ? `2022 Oracle Deck All rights reserved `
              : pageContent.footer1}
          </p>
          <p className="icons">
            {/*<AiFillInstagram>
          <a href="http://youtube.com"></a>
        </AiFillInstagram>
  <AiOutlineTwitter />*/}
          </p>
          <p>
            Follow me on Facebook at
            {pageContent.facebook === undefined ? (
              <a href="https://www.facebook.com">
                {" "}
                <u>facebook.com </u>
              </a>
            ) : (
              <a href={pageContent.facebook}>
                <u> {pageContent.facebook}</u>
              </a>
            )}
          </p>
          <p>
            Follow me on Instagram at
            {pageContent.instagram === undefined ? (
              <a href="https://www.instagram.com">
                <u>instagram.com </u>
              </a>
            ) : (
              <a href={pageContent.instagram}>
                <u> {pageContent.instagram}</u>
              </a>
            )}
          </p>
          <p>
            Follow my website
            {pageContent.website === undefined ? (
              <a href="https://hannahyork.info/">
                <u> https://hannahyork.info/ </u>
              </a>
            ) : (
              <a href={pageContent.website}>
                <u> {pageContent.website} </u>
              </a>
            )}
            for more information
          </p>
          <p>{pageContent.footer2}</p>
          <p>
            {pageContent.footer3 === undefined
              ? `For more information on how to work with me privately you can visit
        holistichealingbyhannah.com Free discovery calls are available, if you
        have questions before booking an appointment.`
              : pageContent.footer3}
          </p>
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
};

export default Footer;
