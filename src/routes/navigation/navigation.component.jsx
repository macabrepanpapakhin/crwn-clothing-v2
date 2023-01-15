import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinkContainer,
  NavLinks,
} from "./navigation.styles";
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
      <NavigationContainer>
        <LogoContainer to="/" onClick={() => setIsCartOpen(false)}>
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinkContainer>
          <NavLinks to="shop" onClick={() => setIsCartOpen(false)}>
            Shop
          </NavLinks>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <NavLinks to="authentication" onClick={() => setIsCartOpen(false)}>
              Sign In
            </NavLinks>
          )}
          <CartIcon />
          <div>{isCartOpen && <CartDropdown />}</div>
        </NavLinkContainer>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
