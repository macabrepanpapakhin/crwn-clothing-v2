import "./checkout.styles.scss";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";

const CheckOut = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <p>Product</p>
        <p>Description</p>
        <p>Quantity</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      {cartItems.map((cartItem) => (
        <CheckOutItem cartItem={cartItem} />
      ))}
      <div className="total">
        <p>TOTAL : ${totalPrice}</p>
      </div>
    </div>
  );
};
export default CheckOut;
