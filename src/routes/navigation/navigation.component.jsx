import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/users.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-drop-down/cart-drop-down.component";
import { CartContext } from "../../contexts/cart.context";
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  console.log("in navigation");
  const signOutHandler = async () => {
    await SignOutUser();
    setCurrentUser(null);
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link
          className="logo-container"
          to="/"
          onClick={() => setIsCartOpen(false)}
        >
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link
            className="nav-link"
            to="shop"
            onClick={() => setIsCartOpen(false)}
          >
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link
              className="nav-link"
              to="authentication"
              onClick={() => setIsCartOpen(false)}
            >
              Sign In
            </Link>
          )}
          <CartIcon />
          <div>{isCartOpen && <CartDropdown />}</div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
