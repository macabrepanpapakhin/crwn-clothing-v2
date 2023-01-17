import { createContext, useEffect, useReducer } from "react";

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
export const CARTSTYPES = {
  SET_CART_ITEMS: "SET_CARTS_ITEMS",
  SET_ITEMS_COUNT: "SET_ITEMS_COUNT",
  SET_TOTAL_PRICE: "SET_TOTAL_PRICE",
  SET_CART_OPEN: "SET_CART_OPEN",
};

const cartsReducer = (state, action) => {
  const { type, payload } = action;

  // if (!type) {
  //   console.log("sss");
  //   console.log(type);
  // }
  // if (!type) throw new Error("lmao error");
  console.log(action);
  switch (type) {
    case CARTSTYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CARTSTYPES.SET_ITEMS_COUNT:
      return { ...state, itemsCount: payload };
    case CARTSTYPES.SET_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CARTSTYPES.SET_TOTAL_PRICE:
      return { ...state, totalPrice: payload };
    default:
      throw new Error(`Unhandled type error ${type} in carts reducer`);
  }
};

export const CartProvider = ({ children }) => {
  const INITIAL_STATE = {
    itemsCount: 0,
    totalPrice: 0,
    cartItems: [],
    isCartOpen: false,
  };
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [itemsCount, setItemsCount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [state, dispatch] = useReducer(cartsReducer, INITIAL_STATE);
  const { cartItems, totalPrice, itemsCount, isCartOpen } = state;
  const addItemToCart = (productToAdd) =>
    dispatch({
      type: CARTSTYPES.SET_CART_ITEMS,
      payload: addCartItem(cartItems, productToAdd),
    });
  //setCartItems(addCartItem(cartItems, productToAdd));

  const removeItem = (productToRemove) =>
    dispatch({
      type: CARTSTYPES.SET_CART_ITEMS,
      payload: reduceItemCount(cartItems, productToRemove),
    });
  // setCartItems(reduceItemCount(cartItems, productToRemove));
  const reduceItems = (productToRemove, amountToRemove) =>
    dispatch({
      type: CARTSTYPES.SET_CART_ITEMS,
      payload: reduceItemCount(cartItems, productToRemove, amountToRemove),
    });
  // setCartItems(reduceItemCount(cartItems, productToRemove, amountToRemove));

  const addItems = (productToAdd, amountToAdd) =>
    dispatch({
      type: CARTSTYPES.SET_CART_ITEMS,
      payload: addItemCount(cartItems, productToAdd, amountToAdd),
    });
  // {
  //   setCartItems(addItemCount(cartItems, productToAdd, amountToAdd));
  // };

  const setIsCartOpen = (tt) => {
    dispatch({ type: CARTSTYPES.SET_CART_OPEN, payload: tt });
  };

  useEffect(() => {
    const newCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // setItemsCount(newCount);
    dispatch({ type: CARTSTYPES.SET_ITEMS_COUNT, payload: newCount });
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    //setTotalPrice(newTotalPrice);
    dispatch({ type: CARTSTYPES.SET_TOTAL_PRICE, payload: newTotalPrice });
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
