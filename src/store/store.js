import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { RootReducer } from "./root-reducer";

const middleWares = [logger];

const composeEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(RootReducer, undefined, composeEnhancer);
