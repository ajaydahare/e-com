import uuid from "uuid";
import Stripe from "stripe";
const secret =
  "sk_test_51IWRMfHbAeOjTHApDxteIOcs8RAYRbO11mQfTZtXB9kSYXWpo8uMqxrhX2CXV53k2fHtIDMpFoAjXFS6lbORFiRV00azZMlZvc";
const stripe = new Stripe(secret);

export const makePayment = (req, res) => {
  const { products, token } = req.body;
  console.log("products", products);

  let amount = 0;
  products.reduce((total, value) => {
    amount = total + value.price;
  }, 0);

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "usd",
            customer: customer.id,
            description: "Software development services",
            receipt_email: token.email,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((error) => console.log(error));
    });
};
