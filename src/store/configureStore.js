import { createStore, combineReducers, compose } from "redux";
import groupsReducer from "../reducers/groups";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    combineReducers({ groups: groupsReducer }),
    composeEnhancers()
  );
  return store;
};

export default configureStore;