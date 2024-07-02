import { message } from "antd";
import axios from "axios";

export const getCrewsByFilmId = (filmId) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get(`http://localhost:7000/film_crew?film_id=${filmId}`);
    const crewsWithRoles = response.data; // [{"film_id":1,"crew_id":1,"role":"Director"}, {"film_id":1,"crew_id":2,"role":"Producer"}]

    // Logging to debug
    console.log('Crews with Roles:', crewsWithRoles);

    // Map through crewsWithRoles to fetch individual crew details and include the role
    const crewDetailsPromises = crewsWithRoles.map(async (crewInfo) => {
      try {
        const crewResponse = await fetchCrewDetailsById(crewInfo.crew_id);
        return { ...crewResponse, role: crewInfo.role }; // Merge role with crew details
      } catch (error) {
        console.error(`Error getting crew with ID ${crewInfo.crew_id}:`, error);
        return null; // Handle error gracefully or as needed
      }
    });

    const crewDetails = await Promise.all(crewDetailsPromises);
    dispatch({ type: 'GET_CREWS_BY_FILM_ID', payload: crewDetails.filter(Boolean) }); // Filter out null values
  } catch (error) {
    console.error(`Error getting Crews for Film ID ${filmId}:`, error);
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
};

// Function to fetch crew details by ID
const fetchCrewDetailsById = async (crewId) => {
  try {
    const response = await axios.get(`http://localhost:7000/crew/${crewId}`);
    return response.data; // Assuming crew details are directly in response.data
  } catch (error) {
    console.error(`Error fetching crew details for ID ${crewId}:`, error);
    return null; // Handle error gracefully or as needed
  }
};


export const editCrew = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:7000/crew", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success('Crew Edited Successfully');
  } catch (error) {
    message.error('Error while editing crew');
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCrew = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.delete("http://localhost:7000/crew", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success('Crew Deleted Successfully');
  } catch (error) {
    message.error('Error while deleting crew');
    dispatch({ type: "LOADING", payload: false });
  }
};
