import React, { useState, useEffect } from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import OracleCart from "../components/OracleCart";
import { client } from "../lib/client";
import banner from "../sanity_ecommerce/schemas/banner";
import oracleCart from "../sanity_ecommerce/schemas/oracle_cart";

import axios from "axios";
import Modal from "../components/modal/Modal";

function Home({ products, bannerData, oracleCartsDup2, pageDup2Content }) {
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
    //console.log("PAGE CONTENT ", pageContent);

    //console.log("selectedCardNumber", selectedCardNumber);
    while (tmp < selectedCardNumber) {
      let selected_index = createRandomNumberInRange(oracleCartsDup2.length);

      if (tmpIndexes.includes(selected_index) === false) {
        tmpCardArr.push(oracleCartsDup2[selected_index]);
        tmpIndexes.push(selected_index);
        tmp++;
      }
    }
    setSelectedCardIndexes([...tmpIndexes]);

    setRandomCards((prevState) => [...tmpCardArr]);
  }, [selectedCardNumber]);

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
          <h2 style={{ fontSize: 20 }}>
            {pageDup2Content.heading1 === undefined
              ? `Think about the question you have right now, what would you like
            clarity on? Decide on the numbers of cards you wish to receive. If
            you wish to save your reading, you may email it to yourself. This
            site is for entertainment purposes only.`
              : pageDup2Content.heading1}
          </h2>
          <div style={{ margin: "25px" }}></div>

          <h2 style={{ fontSize: 20, color: "#6d7075" }}>
            {pageDup2Content.heading1_darkGray === undefined
              ? `Think about the question you have right now, what would you like
            clarity on? Decide on the numbers of cards you wish to receive. If
            you wish to save your reading, you may email it to yourself. This
            site is for entertainment purposes only.`
              : pageDup2Content.heading1_darkGray}
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
              <buttonImage
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(2);
                  setCardNoSelected(true);
                }}
              >
                2 Cards
              </buttonImage>
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
        <h2 style={{ fontSize: 20 }}>
          {pageDup2Content.heading2 === undefined
            ? `Overview of the Deck`
            : pageDup2Content.heading2}
        </h2>
        <div style={{ margin: "25px" }}></div>
        <h2 style={{ fontSize: 20, color: "#6d7075" }}>
          {pageDup2Content.heading2_darkGray === undefined
            ? `Overview of the Deck`
            : pageDup2Content.heading2_darkGray}
        </h2>
        <div style={{ margin: "60px" }}></div>

        <p>
          {pageDup2Content.heading2 === undefined
            ? `Let the journey begin`
            : pageDup2Content.heading3}
        </p>
      </div>
      <div className="maylike-products-wrapper">
        <div className="marquee">
          <div className="maylike-products-container track">
            {/*{products?.map((product) => {
          return <Product key={product._id} product={product} />;
        })}*/}
            {oracleCartsDup2?.map((oracleCart) => {
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

  const pageContentDup1Query = '*[_type == "pagecontent_dup1"][0]';
  const pageDup1Content = await client.fetch(pageContentDup1Query);

  const pageContentDup2Query = '*[_type == "pagecontent_dup2"][0]';
  const pageDup2Content = await client.fetch(pageContentDup2Query);

  const oracleCartsDup1Query = '*[_type == "cart_dup1"]';
  const oracleCartsDup1 = await client.fetch(oracleCartsDup1Query);

  const oracleCartsDup2Query = '*[_type == "cart_dup2"]';
  const oracleCartsDup2 = await client.fetch(oracleCartsDup2Query);

  return {
    props: {
      products,
      bannerData,
      oracleCarts,
      pageContent,
      pageDup1Content,
      pageDup2Content,
      oracleCartsDup1,
      oracleCartsDup2,
    },
  };
};

export default Home;
