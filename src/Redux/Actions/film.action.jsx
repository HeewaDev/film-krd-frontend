import { message } from "antd";
import axios from "axios";

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

export const getCastsByFilmId = (filmId) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
  
    try {
      const response = await axios.get(`http://localhost:7000/film_casts?film_id=${filmId}`);
      const casts = response.data; 
      dispatch({ type: 'GET_CASTS_BY_FILM_ID', payload: casts });
      dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
      console.error(`Error getting Casts for Film ID ${filmId}:`, error);
      dispatch({ type: 'LOADING', payload: false });
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
