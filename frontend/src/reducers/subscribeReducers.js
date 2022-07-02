import {
  SUBSCRIBE_ADD_ITEM,
  SUBSCRIBE_REMOVE_ITEM,
} from "../constants/subscribeConstants";

export const subscribeReducer = (state = { subscribeItems: [] }, action) => {
  switch (action.type) {
    case SUBSCRIBE_ADD_ITEM:
      const item = action.payload;

      const existItem = state.subscribeItems.find(
        (x) => x.mentor === item.mentor
      );

      if (existItem) {
        return {
          ...state,
          subscribeItems: state.subscribeItems.map((x) =>
            x.mentor === existItem.mentor ? item : x
          ),
        };
      } else {
        return {
          ...state,
          subscribeItems: [...state.subscribeItems, item],
        };
      }
    case SUBSCRIBE_REMOVE_ITEM:
      return {
        ...state,
        subscribeItems: state.subscribeItems.filter(
          (x) => x.mentor !== action.payload
        ),
      };

    default:
      return state;
  }
};
