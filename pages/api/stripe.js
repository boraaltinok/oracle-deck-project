import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  //console.log("HEREE");
  if (req.method === "POST") {
    //console.log("hello1: ");

    //console.log("REQ: ", req);
    //console.log("hello2: ");

    //console.log("CART ITEMS: ", req.body);
    try {
      // console.log("on try");
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LX8i4Ccq6Ej1MMx1jokpfIo" },
          { shipping_rate: "shr_1LX8imCcq6Ej1MMxa0FQcOdd" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/2rxj09et/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      //console.log("on try end1");
      try {
        const session = await stripe.checkout.sessions.create(params);
      } catch (error) {
        console.log("error message = ", error.message);
      }
      //console.log("on try end2");

      console.log(
        "res.status(200).json(session)",
        res.status(200).json(session)
      );

      res.status(200).json(session);
    } catch (err) {
      console.log("on catch");
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    //console.log("on else");

    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
