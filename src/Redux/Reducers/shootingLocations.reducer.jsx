const initialState = {
    shootingLocations: [],
    shootingLocation: null,
    loading: false,
    error: null,
    location: []
  };
  
  const ShootingLocationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOADING_SHOOTING_LOCATIONS':
        return {
          ...state,
          loading: action.payload,
        };
      case 'GET_ALL_SHOOTING_LOCATIONS':
        return {
          ...state,
          shootingLocations: action.payload,
          loading: false,
        };
      case 'GET_SHOOTING_LOCATION_BY_ID':
        return {
          ...state,
          location: action.payload,
          loading: false,
        };
      case 'CREATE_SHOOTING_LOCATION':
        return {
          ...state,
          loading: false,
        };
      case 'UPDATE_SHOOTING_LOCATION':
        return {
          ...state,
          shootingLocations: state.shootingLocations.map((location) =>
            location.id === action.payload.id ? action.payload : location
          ),
          loading: false,
        };
      case 'DELETE_SHOOTING_LOCATION':
        return {
          ...state,
          shootingLocations: state.shootingLocations.filter(
            (location) => location.id !== action.payload
          ),
          loading: false,
        };
      case 'ERROR_SHOOTING_LOCATIONS':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default ShootingLocationsReducer;
  