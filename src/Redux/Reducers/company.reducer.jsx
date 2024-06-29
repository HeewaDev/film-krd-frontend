const initialData = {
  companies: [],
  loading: false,
};

export const CompanyReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'GET_ALL_COMPANIES':
      return {
        ...state,
        companies: action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
