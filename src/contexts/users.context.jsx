import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  SignOutUser,
} from "../utils/firebase/firebase.utils";
import { setCurrentUser } from "../store/user/user.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USERS_ACTIONS_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_ACTIONS_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in user reducer.`);
  }
};

const INITIAL_STATE = { currentUser: null };

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // SignOutUser();
  // const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  // const { currentUser } = state;

  // const setCurrentUser = (user) => {
  //   dispatch({ type: USERS_ACTIONS_TYPES.SET_CURRENT_USER, payload: user });
  // };

  const { currentUser } = useSelector((state) => state.user);

  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
