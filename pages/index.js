import React, { useState, useEffect } from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import MailForm from "../components/MailForm";
import OracleCart from "../components/OracleCart";
import { client } from "../lib/client";
import banner from "../sanity_ecommerce/schemas/banner";
import oracleCart from "../sanity_ecommerce/schemas/oracle_cart";

import axios from "axios";
import Modal from "../components/modal/Modal";

function Home({ products, bannerData, oracleCarts }) {
  const [recieverMail, setRecieverMail] = useState("");
  const [selectedCardNumber, setSelectedCardNumber] = useState(0);
  const [randomCards, setRandomCards] = useState([]);
  const [selectedCardIndexes, setSelectedCardIndexes] = useState([]);
  const [showStep2, setShowStep2] = useState(false);
  const [cardNoSelected, setCardNoSelected] = useState(false);

  /*const fillSelectedIndexes = (oracle_carts_length) => {
    let tmp = 0;
    let tmpIndexes = [];
    let tmpCardArr = [];
    console.log("selectedCardNumber", selectedCardNumber);
    while (tmp < selectedCardNumber) {
      let selected_index = createRandomNumberInRange(oracle_carts_length);
      /*console.log("loop iterated");
      console.log("selected_index", selected_index);
      console.log(
        "tmpIndexes.includes(selected_index) === false",
        tmpIndexes.includes(selected_index) === false
      );*/

  /* if (tmpIndexes.includes(selected_index) === false) {
        //console.log("inside if");
        tmpCardArr.push(oracleCarts[selected_index]);
        tmpIndexes.push(selected_index);
        tmp++;
        //console.log("selected_indexes = ", tmpIndexes);
      }
    }
    setSelectedCardIndexes([...tmpIndexes]);

    setRandomCards((prevState) => [...tmpCardArr]);
  };*/

  useEffect(() => {
    let tmp = 0;
    let tmpIndexes = [];
    let tmpCardArr = [];
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
    //console.log("selected_card-indexes = ", selectedCardIndexes);

    setRandomCards((prevState) => [...tmpCardArr]);
    //console.log("random cARTs = ", randomCards);
    //console.log("random selectedddd cartss", randomCards);
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
    //e.preventDefault();
    //setImage(oracleCarts[0].image[0]);
    //console.log("image = ", image);
    //console.log("oracleCarts[0].image[0]", oracleCarts[0].image[0]);

    //fillSelectedIndexes(oracleCarts.length);

    //e.preventDefault();
    let config = {
      method: "post",
      url: "http://localhost:3000/api/contact",
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

  return (
    <>
      {/*{console.log("ORACLE CARDS = ", oracleCarts)}*/}
      {/*<HeroBanner heroBanner={bannerData.length && bannerData[0]} />*/}
      {/*{console.log("image", bannerData[0].image)}*/}
      <div>
        <div className="products-heading">
          <h2>HOW MANY CARDS WOULD YOU LIKE?</h2>
          {showStep2 === false ? (
            <div className="buttons">
              <button
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(1);
                  setCardNoSelected(true);
                  //fillSelectedIndexes(oracleCarts.length);
                }}
              >
                1 Card
              </button>
              <button
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(2);
                  setCardNoSelected(true);
                  //fillSelectedIndexes(oracleCarts.length);
                }}
              >
                2 Cards
              </button>
              <button
                className="add-to-cart"
                onClick={() => {
                  setSelectedCardNumber(3);
                  setCardNoSelected(true);
                  //fillSelectedIndexes(oracleCarts.length);
                }}
              >
                3 Cards
              </button>
            </div>
          ) : null}

          {showStep2 === true ? (
            <div>
              {/*<h2>STEP 2:ENTER YOUR EMAIL TO RECIEVE YOUR CARDS</h2>
              <form onSubmit={handleSent}>
                <div className="t">
                  <input
                    type="text"
                    onChange={(e) => setRecieverMail(e.target.value)}
                  ></input>
                </div>

                <button type="submit" className="">
                  Send the cards
                </button>
          </form>*/}
              <div className="options">
                {/*<button>Mail me the Images</button>
                <button>Mail me the Images</button>*/}
              </div>
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
                <Modal
                  handleSent={handleSent}
                  setRecieverMail={setRecieverMail}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="products-heading">
        <h2>Overview of the Deck</h2>
        <p>Let the journey begin...</p>
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

  return {
    props: { products, bannerData, oracleCarts },
  };
};

export default Home;
