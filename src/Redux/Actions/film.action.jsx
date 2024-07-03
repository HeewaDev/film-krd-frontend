import { message } from "antd";
import axios from "axios";
import { getCastById } from './casts.action'; // Adjust import if necessary

export const getFilms = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get('http://localhost:7000/films');
    const { data } = response; // Assuming Films are directly in response.data
    dispatch({ type: 'GET_ALL_FILMS', payload: data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    message.error('Error getting Films');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const getFilmById = (id) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get(`http://localhost:7000/films/${id}`);
    const film = response.data; 
    dispatch({ type: 'GET_FILM_BY_ID', payload: film });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error(`Error getting Film with ID ${id}:`, error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

// Action to fetch casts by film ID
export const getCastsByFilmId = (filmId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get(`http://localhost:7000/film_casts?film_id=${filmId}`);
    const castsWithRoles = response.data; // Assuming response is like [{"film_id":1,"casts_id":1,"role":"Zana"}, {"film_id":1,"casts_id":2,"role":"Dana"}]

    // Map through castsWithRoles to fetch individual cast details
    const castDetailsPromises = castsWithRoles.map(async (castInfo) => {
      try {
        // Dispatch getCastById with cast ID and role
        const castResponse = await dispatch(getCastById(castInfo.casts_id, castInfo.role));
        return castResponse.payload; // Assuming cast data is directly in response.payload
      } catch (error) {
        console.error(`Error getting cast with ID ${castInfo.casts_id}:`, error);
        return null; // Handle error gracefully or as needed
      }
    });

    // Resolve all promises and dispatch the result
    const castDetails = await Promise.all(castDetailsPromises);
    dispatch({ type: 'GET_CASTS_BY_FILM_ID', payload: castDetails });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error(`Error getting Casts for Film ID ${filmId}:`, error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

// Action to fetch companies by film ID
export const getCompaniesByFilmId = (filmId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    console.log('Fetching companies for Film ID:', filmId)
    const response = await axios.get(`http://localhost:7000/film_companies?film_id=${filmId}`);
    const companies = response.data; // Assuming response is like [{"film_id":1,"company_id":1,"role":"Production"}, {"film_id":1,"company_id":2,"role":"Distribution"}]

    // Map through companies to fetch individual company details
    const companyDetailsPromises = companies.map(async (companyInfo) => {
      try {
        // Dispatch action to fetch company details (adjust as per your structure)
        const companyResponse = await fetchCompanyDetailsById(companyInfo.company_id);
        return companyResponse; // Assuming company data is directly in response
      } catch (error) {
        console.error(`Error getting company with ID ${companyInfo.company_id}:`, error);
        return null; // Handle error gracefully or as needed
      }
    });

    // Resolve all promises and dispatch the result
    const companyDetails = await Promise.all(companyDetailsPromises);
    dispatch({ type: 'GET_COMPANIES_BY_FILM_ID', payload: companyDetails });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error(`Error getting Companies for Film ID ${filmId}:`, error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

// Function to fetch company details by ID (example function, adjust as per your backend structure)
const fetchCompanyDetailsById = async (companyId) => {
  try {
    const response = await axios.get(`http://localhost:7000/companies/${companyId}`);
    return response.data; // Assuming company details are directly in response.data
  } catch (error) {
    console.error(`Error fetching company details for ID ${companyId}:`, error);
    return null; // Handle error gracefully or as needed
  }
};

export const addFilm = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:7000/films", reqObj);
    dispatch({ type: "CREATE_FILM", payload: true });
    message.success('New Film Added Successfully');
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error('Error while creating film');
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editFilm = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:7000/films", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success('Film Edited Successfully');
  } catch (error) {
    message.error('Error while editing film');
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteFilm = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.delete("http://localhost:7000/films", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success('Film Deleted Successfully');
  } catch (error) {
    message.error('Error while deleting film');
    dispatch({ type: "LOADING", payload: false });
  }
};
