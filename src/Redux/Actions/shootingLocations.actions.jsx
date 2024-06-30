import { message } from 'antd';
import axios from 'axios';

// Action to get all shooting locations
export const getShootingLocations = () => async (dispatch) => {
  dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: true });

  try {
    const response = await axios.get('http://localhost:7000/shooting-locations');
    const { data } = response; // Assuming shooting locations are directly in response.data
    dispatch({ type: 'GET_ALL_SHOOTING_LOCATIONS', payload: data });
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  } catch (error) {
    message.error('Error getting shooting locations');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  }
};

// Action to get shooting location by ID
export const getShootingLocationById = (id) => async (dispatch) => {
  dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: true });

  try {
    const response = await axios.get(`http://localhost:7000/shooting-locations/${id}`);
    const location = response.data;
    dispatch({ type: 'GET_SHOOTING_LOCATION_BY_ID', payload: location });
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  } catch (error) {
    console.error(`Error getting shooting location with ID ${id}:`, error);
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  }
};

// Action to add a new shooting location
export const addShootingLocation = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: true });

  try {
    await axios.post('http://localhost:7000/shooting-locations', reqObj);
    dispatch({ type: 'CREATE_SHOOTING_LOCATION', payload: true });
    message.success('New shooting location added successfully');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  } catch (error) {
    message.error('Error while adding shooting location');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  }
};

// Action to edit an existing shooting location
export const editShootingLocation = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: true });

  try {
    await axios.put(`http://localhost:7000/shooting-locations/${reqObj.id}`, reqObj);
    dispatch({ type: 'UPDATE_SHOOTING_LOCATION', payload: reqObj });
    message.success('Shooting location edited successfully');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  } catch (error) {
    message.error('Error while editing shooting location');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  }
};

// Action to delete a shooting location
export const deleteShootingLocation = (id) => async (dispatch) => {
  dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: true });

  try {
    await axios.delete(`http://localhost:7000/shooting-locations/${id}`);
    dispatch({ type: 'DELETE_SHOOTING_LOCATION', payload: id });
    message.success('Shooting location deleted successfully');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  } catch (error) {
    message.error('Error while deleting shooting location');
    dispatch({ type: 'LOADING_SHOOTING_LOCATIONS', payload: false });
  }
};
