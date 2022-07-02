import axios from "axios";
import {
  SUBSCRIBE_ADD_ITEM,
  SUBSCRIBE_REMOVE_ITEM,
} from "../constants/subscribeConstants";

export const addMentor = (id, year) => async (dispatch, getstate) => {
  const { data } = await axios.get(`/api/mentors/${id}`);

  dispatch({
    type: SUBSCRIBE_ADD_ITEM,
    payload: {
      mentor: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      year,
    },
  });

  localStorage.setItem(
    "subscribeItems",
    JSON.stringify(getstate().subscribe.subscribeItems)
  );
};

export const removeMentor = (id) => (dispatch, getState) => {
  dispatch({
    type: SUBSCRIBE_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "subscribeItems",
    JSON.stringify(getState().subscribe.subscribeItems)
  );
};
