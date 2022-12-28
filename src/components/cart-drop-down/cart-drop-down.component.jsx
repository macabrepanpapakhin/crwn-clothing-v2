import "./cart-drop-down.styles.scss";
import Button from "../button/button.component";
import CartItem from "../card-item/card-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>Go To Check Out</Button>
    </div>
  );
};
export default CartDropdown;
