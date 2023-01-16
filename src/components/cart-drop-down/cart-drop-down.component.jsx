import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-drop-down.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../card-item/card-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  return (
    <CartDropDownContainer>
      {cartItems.length ? (
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CartItems>
      ) : (
        <EmptyMessage>No Item In The Cart</EmptyMessage>
      )}

      <Link to="/checkout">
        <Button
          onClick={() => {
            setIsCartOpen(false);
          }}
        >
          CheckOut
        </Button>
      </Link>
    </CartDropDownContainer>
  );
};
export default CartDropdown;
