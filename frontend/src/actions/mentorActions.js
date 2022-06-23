import axios from "axios";
import {
  MENTOR_LIST_REQUEST,
  MENTOR_LIST_SUCCESS,
  MENTOR_LIST_FAIL,
  MENTOR_DETAILS_REQUEST,
  MENTOR_DETAILS_SUCCESS,
  MENTOR_DETAILS_FAIL,
} from "../constants/mentorConstants";

export const listMentors = () => async (dispatch) => {
  try {
    dispatch({ type: MENTOR_LIST_REQUEST });

    const { data } = await axios.get("/api/mentors");

    dispatch({
      type: MENTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMentorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MENTOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/mentors/${id}`);

    dispatch({
      type: MENTOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
