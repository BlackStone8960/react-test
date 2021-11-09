import { createStore, combineReducers, compose } from "redux";
import groupReducer from "../reducers/group";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      groupOne: groupReducer,
      groupTwo: groupReducer,
      groupThree: groupReducer,
      groupFour: groupReducer
    }),
    composeEnhancers()
  );
  return store;
};
