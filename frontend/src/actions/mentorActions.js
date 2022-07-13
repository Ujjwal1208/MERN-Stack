import axios from "axios";
import {
  MENTOR_LIST_REQUEST,
  MENTOR_LIST_SUCCESS,
  MENTOR_LIST_FAIL,
  MENTOR_DETAILS_REQUEST,
  MENTOR_DETAILS_SUCCESS,
  MENTOR_DETAILS_FAIL,
  MENTOR_DELETE_REQUEST,
  MENTOR_DELETE_SUCCESS,
  MENTOR_DELETE_FAIL,
  MENTOR_ADD_REQUEST,
  MENTOR_ADD_SUCCESS,
  MENTOR_ADD_FAIL,
  MENTOR_UPDATE_REQUEST,
  MENTOR_UPDATE_SUCCESS,
  MENTOR_UPDATE_FAIL,
  MENTOR_ADD_REVIEW_REQUEST,
  MENTOR_ADD_REVIEW_SUCCESS,
  MENTOR_ADD_REVIEW_FAIL,
  MENTOR_TOP_REQUEST,
  MENTOR_TOP_SUCCESS,
  MENTOR_TOP_FAIL,
} from "../constants/mentorConstants";

export const listMentors =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: MENTOR_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/mentors?keyword=${keyword}&pageNumber=${pageNumber}`
      );

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

export const deleteMentor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENTOR_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/mentors/${id}`, config);

    dispatch({
      type: MENTOR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MENTOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMentor = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENTOR_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/mentors`, {}, config);

    dispatch({
      type: MENTOR_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENTOR_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMentor = (mentor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENTOR_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/mentors/${mentor._id}`,
      mentor,
      config
    );

    dispatch({
      type: MENTOR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENTOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addMentorReview =
  (mentorId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MENTOR_ADD_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/mentors/${mentorId}/reviews`, review, config);

      dispatch({
        type: MENTOR_ADD_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: MENTOR_ADD_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopMentors = () => async (dispatch) => {
  try {
    dispatch({ type: MENTOR_TOP_REQUEST });

    const { data } = await axios.get(`/api/mentors/top`);

    dispatch({
      type: MENTOR_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MENTOR_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
