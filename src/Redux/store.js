import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { thunk } from "redux-thunk";

import {CrewReducer} from './Reducers/crew.reducer'
import {CastsReducer} from './Reducers/casts.reducer'
import {CompanyReducer} from './Reducers/company.reducer'
import FilmsReducer from "./Reducers/film.reducer";
import ShootingLocationsReducer from "./Reducers/shootingLocations.reducer";
import CompaniesReducer from './Reducers/companies.reducer'; // Import CompaniesReducer
// Enhancers for Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Middleware (if any) you might use with your store
// Example: import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  ShootingLocationsReducer,
 FilmsReducer,
  CrewReducer,
  CastsReducer,
  CompaniesReducer, // Add CompaniesReducer here
  CompanyReducer
});
// Create store with enhancers
const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(applyMiddleware(thunk))
);

export default store;