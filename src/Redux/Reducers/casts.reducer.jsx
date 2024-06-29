const initialData = {
  casts: [],
  cast: {}, // To hold the details of a single cast member
  loading: false,
  error: null,
};

export const CastsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_CASTS":
      return {
        ...state,
        casts: action.payload,
      };

    case "GET_CAST_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_CAST_BY_ID_SUCCESS":
      return {
        ...state,
        cast: action.payload,
        loading: false,
      };

    case "GET_CAST_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_CASTS":
      // Optionally handle update logic if needed
      return state;

    default:
      return state;
  }
};
