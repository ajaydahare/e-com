import React, { useState } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/CardHelper";
import Image from "./helper/ImageHelper";

function Card({
  product,
  addtoCart = true,
  removeFromcart = false,
  setReload,
  reload,
}) {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <div className="col-12">
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const showRemoveFromCart = (removeFromcart) => {
    return (
      removeFromcart && (
        <div className="col-12">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info  text-center">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        <Image product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          {showAddtoCart(addtoCart)}
          {showRemoveFromCart(removeFromcart)}
          {getRedirect()}
        </div>
      </div>
    </div>
  );
}

export default Card;
