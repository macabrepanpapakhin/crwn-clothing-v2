import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinkContainer,
  NavLinks,
} from "./navigation.styles";

import { SignOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-drop-down/cart-drop-down.component";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";
import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  console.log("in navigation");
  const signOutHandler = async () => {
    console.log("signing out");
    await SignOutUser();
    dispatch(setCurrentUser(null));
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
            <NavLinks className="nav-link" onClick={signOutHandler}>
              Sign Out
            </NavLinks>
          ) : (
            <NavLinks to="authentication">Sign In</NavLinks>
          )}
          {console.log(currentUser)}
          <CartIcon />
          <div>{isCartOpen && <CartDropdown />}</div>
        </NavLinkContainer>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
