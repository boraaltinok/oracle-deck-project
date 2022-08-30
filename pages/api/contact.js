import nodemailer from "nodemailer";
import { urlFor } from "../../lib/client";
import "../../styles/globals.css";

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
      user: "holistichealingbyhannah@gmail.com",
      pass: `${process.env.EMAIL_HANNAH_SECRET}`,
    },
  });

  try {
    const email = await transporter.sendMail({
      from: "holistichealingbyhannah@gmail.com",
      to: `${recieverMail}`,
      subject: "ORACLE DECK",
      html: `<html>
      <head>
      <style>
      .hello-text {
        background-color: #f02d34;
        color: aqua;
      }
      .grid-container {
        display: grid;
        grid-template-columns: 350px 100px;
        grid-template-rows: minmax(500px, auto);
      }
      </style>
      </head>

      <body>
   <p style="text-align:center; font-size:25px;"><strong>Oracle Card Message</strong></p>
         <img src="${urlFor(
           randomCards[0].image[0]
         ).url()}" width="350" height="500" style="  display: block;
         margin-left: auto;
         margin-right: auto;"></img>
      <p style="text-align:center; font-size:25px; color: #324d67;"><strong>${
        randomCards[0].name
      }:</strong></p>
      <h3>${randomCards[0].details}</h3>
      ${
        randomCards.length > 1
          ? `<img src="${
              randomCards[1].image[0] !== undefined
                ? urlFor(randomCards[1].image[0]).url()
                : null
            }" width="350" height="500" style="  display: block;
      margin-left: auto;
      margin-right: auto;"></img>
      <p style="text-align:center; font-size:25px; color: #324d67;"><strong>${
        randomCards[1].name
      }:</strong></p>
      <h3>${randomCards[1].details}</h3>`
          : ``
      }
      ${
        randomCards.length > 2
          ? `<img src="${
              randomCards[2].image[0] !== undefined
                ? urlFor(randomCards[2].image[0]).url()
                : null
            }" width="350" height="500" style="  display: block;
          margin-left: auto;
          margin-right: auto;"></img>
          <p style="text-align:center; font-size:25px; color: #324d67;"><strong>${
            randomCards[2].name
          }:</strong></p>
          <h3>${randomCards[2].details}</h3>`
          : ``
      }
   

   <p style="text-align:center; font-size:20px; color: #324d67;">Follow me on Facebook and Instagram @HHBHannah</p>
   <h6 style="color: #324d67;">For more information on how to work with me privately you can visit
      holistichealingbyhannah.com
      Free discovery calls are available, if you have questions before booking an appointment.
   </h6>
</body>
      </html>
      `,
      /*attachments: [...attachemnts],*/
    });

    console.log("message sent", email.messageId);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(req.body);
};
