import "./cart-drop-down.styles.scss";
import Button from "../button/button.component";
import CartItem from "../card-item/card-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";
const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      {cartItems.length ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: "100px", marginBottom: "50px" }}>
          You don't have no item in cart
        </div>
      )}

      <Link to="/checkout">
        <Button>CheckOut</Button>
      </Link>
    </div>
  );
};
export default CartDropdown;
