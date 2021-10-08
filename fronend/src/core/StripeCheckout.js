import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/CardHelper";
import CheckoutStripe from "react-stripe-checkout";
import { API } from "../Backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({ products, setReload, reload }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticate() && isAuthenticate().token;
  const userId = isAuthenticate() && isAuthenticate().user._id;

  const getFinalPrice = () => {
    if (products) {
      return products.reduce((total, value) => {
        return total + value.price;
        // return currentValue.price+nextValue.price * nextValue.price.count
      }, 0);
    }
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
        console.log("payment success");
        emptyCart(() => {
          console.log("empty card");
        });
        setReload(!reload);
      })
      .catch((error) => {
        console.log("payment falied");
      });
  };
  const showStripeButton = () => {
    return isAuthenticate() ? (
      <CheckoutStripe
        stripeKey="pk_test_51IWRMfHbAeOjTHApwpFGVHZuP49H3koRzTHbZdCv00wGRlqDznhSAaCh64a4SP4N9v6BbL4xBZf2UrZXmzbSxaZw00euDL0qtz"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Pay with Stripe"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">pay with Stripe</button>
      </CheckoutStripe>
    ) : (
      <Link className="btn btn-danger" to="/signin">
        Sign In for Checkout
      </Link>
    );
  };
  return (
    <div>
      <h3 className="text-white">Strip Checkout ₹{getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
