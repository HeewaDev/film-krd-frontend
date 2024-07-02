import { message } from "antd";
import axios from "axios";

export const getCasts = () => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const { data: casts } = await axios.get('http://localhost:7000/casts');
        dispatch({ type: 'GET_ALL_CASTS', payload: casts });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        message.error('Error getting casts');
        dispatch({ type: "LOADING", payload: false });
    }
}


export const getCastById = (id, role) => async (dispatch) => {
    dispatch({ type: 'LOADING_CAST', payload: true });
  
    try {
      const response = await axios.get(`http://localhost:7000/casts/${id}`);
      const { data } = response; // Assuming cast data is directly in response.data
  
      // Include role in the cast data
      const castWithRole = { ...data, role };
      dispatch({ type: 'GET_CAST_BY_ID', payload: castWithRole });
      dispatch({ type: 'LOADING_CAST', payload: false });
      return { success: true, payload: castWithRole }; // Return success and payload
    } catch (error) {
      console.error('Error getting cast:', error);
      dispatch({ type: 'LOADING_CAST', payload: false });
      return { success: false, error }; // Return failure and error
    }
  };

export const AddCast = (ReqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        await axios.post("http://localhost:7000/casts", ReqObj);
        dispatch({ type: "CREATE_CAST", payload: true });
        message.success('New Cast Added Successfully');
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        message.error('Error while creating cast');
        dispatch({ type: "LOADING", payload: false });
    }
}

export const EditCast = (ReqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        await axios.post("http://localhost:7000/casts", ReqObj);
        dispatch({ type: "LOADING", payload: false });
        message.success('Cast Edited Successfully');
    } catch (error) {
        message.error('Error while editing cast');
        dispatch({ type: "LOADING", payload: false });
    }
}

export const DeleteCast = (ReqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        await axios.delete("http://localhost:7000/casts", { data: ReqObj });
        dispatch({ type: "LOADING", payload: false });
        message.success('Successfully deleted a cast');
    } catch (error) {
        message.error('Error while deleting a cast');
        dispatch({ type: "LOADING", payload: false });
    }
}
