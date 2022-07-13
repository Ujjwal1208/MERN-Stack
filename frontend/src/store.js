import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  mentorListReducer,
  mentorDetailsReducer,
  mentorDeleteReducer,
  mentorAddReducer,
  mentorUpdateReducer,
  mentorAddReviewReducer,
  mentorTopRatedReducer,
} from "./reducers/mentorReducers";
import { subscribeReducer } from "./reducers/subscribeReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userAdminUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  mentorList: mentorListReducer,
  mentorDetails: mentorDetailsReducer,
  mentorDelete: mentorDeleteReducer,
  mentorAdd: mentorAddReducer,
  mentorUpdate: mentorUpdateReducer,
  mentorAddReview: mentorAddReviewReducer,
  mentorTopRated: mentorTopRatedReducer,
  subscribe: subscribeReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userAdminUpdate: userAdminUpdateReducer,
});

const subscribeItemsStorage = localStorage.getItem("subscribeItems")
  ? JSON.parse(localStorage.getItem("subscribeItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  subscribe: { subscribeItems: subscribeItemsStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
