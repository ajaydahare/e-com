import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CardHelper";
// import PaymentB from "./PaymentB";
import StripeCheckout from "./StripeCheckout";

export const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(() => loadCart());
  }, [reload]);

  const loadAllItems = (products) => {
    return (
      <div>
        <h2>Cart Items</h2>
        {products.map((product, index) => {
          return (
            <Card
              setReload={setReload}
              reload={reload}
              key={index}
              product={product}
              addtoCart={false}
              removeFromcart={true}
            />
          );
        })}
      </div>
    );
  };
  return (
    <Base title="Card Page" description="check card and procced to checkout">
      <div className="row text-center">
        <div className="col-md-6 col-sm-12">
          {products.length > 0 ? (
            loadAllItems(products)
          ) : (
            <h3>nothing in the cart</h3>
          )}
        </div>
        {/* <div className="col-md-6 col-sm-12">
          <PaymentB products={products} setReload={setReload} reload={reload} />
        </div> */}
        {/*stripe payment  */}
        <div className="col-6">
          <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
