import React, { useState, useEffect } from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import MailForm from "../components/MailForm";
import OracleCart from "../components/OracleCart";
import { client } from "../lib/client";
import banner from "../sanity_ecommerce/schemas/banner";
import oracleCart from "../sanity_ecommerce/schemas/oracle_cart";
import pageContent from "../sanity_ecommerce/schemas/page_content";

import axios from "axios";
import Modal from "../components/modal/Modal";

function Home({ products, bannerData, oracleCarts, pageContent }) {
  const [recieverMail, setRecieverMail] = useState("");
  const [selectedCardNumber, setSelectedCardNumber] = useState(0);
  const [randomCards, setRandomCards] = useState([]);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState([]);
  const [showStep2, setShowStep2] = useState(false);
  const [cardNoSelected, setCardNoSelected] = useState(false);

  useEffect(() => {
    let tmp = 0;
    let tmpIndexes = [];
    let tmpCardArr = [];
    console.log("PAGE CONTENT ", pageContent);

    console.log("selectedCardNumber", selectedCardNumber);
    while (tmp < selectedCardNumber) {
      let selected_index = createRandomNumberInRange(oracleCarts.length);
      console.log("loop iterated");
      console.log("selected_index", selected_index);
      console.log(
        "tmpIndexes.includes(selected_index) === false",
        tmpIndexes.includes(selected_index) === false
      );

      if (tmpIndexes.includes(selected_index) === false) {
        console.log("inside if");
        tmpCardArr.push(oracleCarts[selected_index]);
        tmpIndexes.push(selected_index);
        tmp++;
        console.log("selected_indexes = ", tmpIndexes);
      }
    }
    setSelectedCardIndexes([...tmpIndexes]);

    setRandomCards((prevState) => [...tmpCardArr]);
  }, [selectedCardNumber]);

  useEffect(
    () => console.log("use effect selected card indexes ", selectedCardIndexes),
    [selectedCardIndexes]
  );

  const createRandomNumberInRange = (array_size) => {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * array_size);
  };

  const handleSent = async (e) => {
    let config = {
      method: "post",
      url: "https://oracle-deck-by-hannah-york.vercel.app/api/contact",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        recieverMail: recieverMail,
        selectedCardNumber: selectedCardNumber,
        randomCards: randomCards,
        selectedCardIndexes: selectedCardIndexes,
      },
    };

    try {
      const response = await axios(config);
      if (response.data.status == 200) {
        console.log("success");
      }
      console.log("reponse", response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (cardNoSelected > 0) {
      setShowStep2(true);
    }
  }, [cardNoSelected]);

  const handleReset = () => {
    window.location.reload(false);
  };

  return (
    <>
      <div>
        <div className="products-heading">
          <h2 style={{ fontSize: 30 }}>
            {pageContent.heading1 === undefined
              ? `Think about the question you have right now, what would you like
            clarity on? Decide on the numbers of cards you wish to receive. If
            you wish to save your reading, you may email it to yourself. This
            site is for entertainment purposes only.`
              : pageContent.heading1}
          </h2>
          {showStep2 === false ? (
            <div className="buttons">
              <button
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(1);
                  setCardNoSelected(true);
                }}
              >
                1 Card
              </button>
              <button
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(2);
                  setCardNoSelected(true);
                }}
              >
                2 Cards
              </button>
              <button
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(3);
                  setCardNoSelected(true);
                }}
              >
                3 Cards
              </button>
            </div>
          ) : null}

          {showStep2 === true ? (
            <div>
              <div className="options"></div>
              <div className="products-container">
                <h1>REVEALED CARDS:</h1>

                <div className="fade-in">
                  {randomCards.map((randomCart) => {
                    return (
                      <OracleCart
                        key={oracleCart._id}
                        oracleCart={randomCart}
                        width={350}
                        height={500}
                        showDetails={true}
                      />
                    );
                  })}
                </div>
                <div className="btn-container">
                  <Modal
                    handleSent={handleSent}
                    setRecieverMail={setRecieverMail}
                  />
                  <button className="btn-modal" onClick={handleReset}>
                    RESET
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="products-heading">
        <h2 style={{ fontSize: 30 }}>
          {pageContent.heading2 === undefined
            ? `Overview of the Deck`
            : pageContent.heading2}
        </h2>
        <p>
          {pageContent.heading2 === undefined
            ? `Let the journey begin`
            : pageContent.heading3}
        </p>
      </div>
      <div className="maylike-products-wrapper">
        <div className="marquee">
          <div className="maylike-products-container track">
            {/*{products?.map((product) => {
          return <Product key={product._id} product={product} />;
        })}*/}
            {oracleCarts?.map((oracleCart) => {
              return oracleCart.isShowing === true ? (
                <OracleCart
                  key={oracleCart._id}
                  oracleCart={oracleCart}
                  width={175}
                  height={250}
                  showDetails={false}
                />
              ) : null;
            })}
            {/*<MailForm handleSubmit="" />*/}
          </div>
        </div>
      </div>
      {/*<FooterBanner FooterBanner={bannerData && bannerData[0]} />*/}
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const oracleCartsQuery = '*[_type == "oraclecart"]';
  const oracleCarts = await client.fetch(oracleCartsQuery);

  const pageContentQuery = '*[_type == "pagecontent"][0]';
  const pageContent = await client.fetch(pageContentQuery);

  return {
    props: { products, bannerData, oracleCarts, pageContent },
  };
};

export default Home;
