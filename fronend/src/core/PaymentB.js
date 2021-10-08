import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import { emptyCart } from "./helper/CardHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload, reload }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticate() && isAuthenticate().user._id;

  const token = isAuthenticate() && isAuthenticate().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      console.log("info", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      return (amount = amount + p.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });

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
          setInfo({ loading: false, success: false });
          console.log("payment falied");
        });
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <div>
            {!isAuthenticate() && <Link to="/signin">please sign in </Link>}
            {products.length === 0 && <h3>Please add items </h3>}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    isAuthenticate() && getToken(userId, token);
  }, []);
  return (
    <div>
      <h3 className="text-white"> Paying Amount ₹ {getAmount()}</h3>
      {showbtdropIn()}
    </div>
  );
};

export default PaymentB;
