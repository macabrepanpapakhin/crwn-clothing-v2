import "./cart-drop-down.styles.scss";
import Button from "../button/button.component";
const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>Go To Check Out</Button>
    </div>
  );
};
export default CartDropdown;
