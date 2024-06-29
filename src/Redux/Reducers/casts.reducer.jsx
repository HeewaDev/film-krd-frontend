const initialData = {
  casts: [],
}

export const CastsReducer = (state = initialData, action) => {
  switch (action.type) {
      case "GET_ALL_CASTS":
          return {
              ...state,
              casts:action.payload
          }

      case "UPDATE_CASTS":
          return state;


          default:
          return state;

  }
}