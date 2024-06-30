import { message } from 'antd';
import axios from 'axios';

// Action to get all companies
export const getCompanies = () => async (dispatch) => {
  dispatch({ type: 'LOADING_COMPANIES', payload: true });

  try {
    const response = await axios.get('http://localhost:7000/companies');
    const { data } = response; // Assuming companies are directly in response.data
    dispatch({ type: 'GET_ALL_COMPANIES', payload: data });
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  } catch (error) {
    message.error('Error getting companies');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  }
};

// Action to get company by ID
export const getCompanyById = (id) => async (dispatch) => {
  dispatch({ type: 'LOADING_COMPANIES', payload: true });

  try {
    const response = await axios.get(`http://localhost:7000/companies/${id}`);
    const company = response.data;
    dispatch({ type: 'GET_COMPANY_BY_ID', payload: company });
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  } catch (error) {
    console.error(`Error getting company with ID ${id}:`, error);
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  }
};

// Action to add a new company
export const addCompany = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING_COMPANIES', payload: true });

  try {
    await axios.post('http://localhost:7000/companies', reqObj);
    dispatch({ type: 'CREATE_COMPANY', payload: true });
    message.success('New company added successfully');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  } catch (error) {
    message.error('Error while adding company');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  }
};

// Action to edit an existing company
export const editCompany = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING_COMPANIES', payload: true });

  try {
    await axios.put(`http://localhost:7000/companies/${reqObj.id}`, reqObj);
    dispatch({ type: 'UPDATE_COMPANY', payload: reqObj });
    message.success('Company edited successfully');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  } catch (error) {
    message.error('Error while editing company');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  }
};

// Action to delete a company
export const deleteCompany = (id) => async (dispatch) => {
  dispatch({ type: 'LOADING_COMPANIES', payload: true });

  try {
    await axios.delete(`http://localhost:7000/companies/${id}`);
    dispatch({ type: 'DELETE_COMPANY', payload: id });
    message.success('Company deleted successfully');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  } catch (error) {
    message.error('Error while deleting company');
    dispatch({ type: 'LOADING_COMPANIES', payload: false });
  }
};
