
/* eslint-disable */
import { message } from "antd";

const initialState = {
  films: [],
  film: null,
  loading: false,
  error: null,
  cast: [], // Initialize casts state
};

const FilmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'GET_ALL_FILMS':
      return {
        ...state,
        films: action.payload,
        loading: false,
      };
    case 'GET_FILM_BY_ID':
      return {
        ...state,
        film: action.payload,
        loading: false,
      };
    case 'GET_CASTS_BY_FILM_ID':
      return {
        ...state,
        casts: action.payload,
        loading: false,
      };
    case 'CREATE_FILM':
      return {
        ...state,
        loading: false,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default FilmsReducer;
