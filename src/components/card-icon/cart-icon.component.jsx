import {
  ShoppingIcon,
  ItemCount,
  CartIconContainer,
} from "./cart-icon.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, itemsCount } = useContext(CartContext);
  return (
    <CartIconContainer
      onClick={() => {
        isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true);
      }}
    >
      <ShoppingIcon />
      <ItemCount>{itemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
