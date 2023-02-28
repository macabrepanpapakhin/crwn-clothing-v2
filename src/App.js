import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/sign-in/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
