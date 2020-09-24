import { combineReducers } from "redux";
import postReducer from "./postreducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  posts: postReducer,
  user: userReducer,
});

export default allReducers;
