const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/create-payment-intent", async (req, res) => {
  const { amount, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Payment information is missing." });
  }

  try {
    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // The amount you want to charge in cents
      currency: "usd",
      payment_method_types: ["card"],
      confirmation_method: "manual",
      confirm: true, // Specify the payment method type as "card"
      payment_method_data: {
        type: "card",
        card: {
          token: token, // Use the token here
        },
      },
      // You can add more options here if needed
    });

    // Confirm the Payment Intent to initiate the payment
    const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

    // Send the client secret to the client
    res.json({ clientSecret: confirmedIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the payment.", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
