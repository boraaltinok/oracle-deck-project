import nodemailer from "nodemailer";
import { urlFor } from "../../lib/client";
/*
    {
      // use URL as an attachment
      filename: "card1.png",
      path: `https://cdn.sanity.io/images/2rxj09et/production/5b70b01efacd74896b37b7add92f6d955320aaed-1050x1725.jpg`,
    },
    {
      // use URL as an attachment
      filename: "card3.png",
      path: `https://cdn.sanity.io/images/2rxj09et/production/5b70b01efacd74896b37b7add92f6d955320aaed-1050x1725.jpg`,
    },*/
export default async (req, res) => {
  const { recieverMail, selectedCardNumber, randomCards, selectedCardIndexes } =
    req.body;
  /*console.log(recieverMail);
  console.log("cardImage", cardImage);
  console.log("randomCards[0].image[0]", randomCards[0].image[0]);
  console.log(
    "url link for randomCards[0]",
    urlFor(randomCards[0].image[0]).url()
  );
  console.log("selectedCardNumber", selectedCardNumber);
  console.log("selectedCardIndexes", selectedCardIndexes);*/

  const attachemnts = [];
  for (let i = 0; i < selectedCardIndexes.length; i++) {
    attachemnts.push({
      // use URL as an attachment
      filename: `card${i + 1}.png`,
      path: `${urlFor(randomCards[i].image[0]).url()}`,
    });
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "boraaltinok26@gmail.com",
      pass: "mkfazbjnpsdqomss",
    },
  });

  try {
    const email = await transporter.sendMail({
      from: "boraaltinok26@gmail.com",
      to: `${recieverMail}`,
      subject: "ORACLE DECK",
      html: `<html>
      <p>TAKE A LOOK AT YOUR CART!</p>
      <img src="https://cdn.sanity.io/images/2rxj09et/production/4a0baed7620c72439fd14bcbcaae89e325e209c3-1050x1725.png"></img></html>
      `,
      attachments: [...attachemnts],
    });

    console.log("message sent", email.messageId);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(req.body);
};
