import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  SignOutUser,
} from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  //SignOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      //console.log("in the user context");
      //console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
