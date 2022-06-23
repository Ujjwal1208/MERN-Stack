import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  mentorListReducer,
  mentorDetailsReducer,
} from "./reducers/mentorReducers";

const reducer = combineReducers({
  mentorList: mentorListReducer,
  mentorDetails: mentorDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
