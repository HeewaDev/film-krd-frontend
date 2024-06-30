const initialState = {
    companies: [],
    loading: false,
    error: null,
  };
  
  const CompaniesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOADING_COMPANIES':
        return { ...state, loading: action.payload };
      case 'GET_ALL_COMPANIES':
        return { ...state, companies: action.payload, loading: false };
      case 'GET_COMPANY_BY_ID':
        return { ...state, company: action.payload, loading: false };
      case 'CREATE_COMPANY':
        return { ...state, loading: false };
      case 'UPDATE_COMPANY':
        return { ...state, companies: state.companies.map((company) => 
          company.id === action.payload.id ? action.payload : company
        ), loading: false };
      case 'DELETE_COMPANY':
        return { ...state, companies: state.companies.filter((company) => company.id !== action.payload), loading: false };
      default:
        return state;
    }
  };
  
  export default CompaniesReducer;
  