import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemsCount: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItems) => cartItems.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceItemCount = (cardItems, productToRemove, amountToRemove) => {
  if (!amountToRemove) {
    return cardItems.filter((cardItem) => cardItem.id !== productToRemove.id);
  }

  return cardItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? {
          ...cartItem,
          quantity:
            cartItem.quantity - amountToRemove > 1
              ? cartItem.quantity - amountToRemove
              : 1,
        }
      : cartItem
  );
};
const addItemCount = (cardItems, productToAdd, amountToAdd) => {
  return cardItems.map((cartItem) =>
    cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + amountToAdd }
      : cartItem
  );
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItem = (productToRemove) =>
    setCartItems(reduceItemCount(cartItems, productToRemove));
  const reduceItems = (productToRemove, amountToRemove) => {
    setCartItems(reduceItemCount(cartItems, productToRemove, amountToRemove));
  };
  const addItems = (productToAdd, amountToAdd) => {
    setCartItems(addItemCount(cartItems, productToAdd, amountToAdd));
  };

  useEffect(() => {
    const newCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setItemsCount(newCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    itemsCount,
    reduceItems,
    addItems,
    removeItem,
    totalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
