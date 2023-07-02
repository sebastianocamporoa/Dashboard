import { createStore } from "redux";
import { combineReducers } from "redux";
import userReducer from "./redux/reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
