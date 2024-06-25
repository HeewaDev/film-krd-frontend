

import { message } from "antd";
import axios from "axios";

export const GetCrews = () => async (dispatch) => {

    dispatch ({type: 'LOADING', payload: true})

    try {
        const {Crews} = await axios.get('localhost:7000/crew')
        dispatch({type: 'GET_ALL_CREW', payload: Crews})
        dispatch({type: 'LOADING', payload: false})

    } catch (error) {
        message.error('error getting Crews')
        dispatch({type: "LOADING", payload: false})
    }
}




export const AddCrew = (ReqObj) => async (dispatch) => {

dispatch({type: "LOADING", payload: true})

try {
    await axios.post("localhost:7000/crew", ReqObj)

    dispatch({type: "CREATE_CREW", payload: true})
    message.success('New Crew Added Succefully')
    dispatch({type: "LOADING", payload: false})

} catch (error) {

    message.error('error while creating Crew')
    dispatch({type: "LOADING", payload: false})
    
}

}



export const EditCrew = (ReqObj) => async(dispatch) =>{
    dispatch({type: "LOADING", payload: true})


    try {

        await axios.post("localhost:7000/crew", ReqObj)
        dispatch({type: "Loading", payload: false})

        message.success('Crew Editted Succesfully')
        
    } catch (error) {
        message.error('error while edditing Crew')
    }
}


export const DeleteCrew = (ReqObj) => async (dispatch) => {
    dispatch({type: "LOADING", payload: true})


    try {
        await axios.delete("localhost:7000/crew", ReqObj)
        dispatch({type: "LOADING", payload: false})

        message.success('Succesfully deleted a crew')
    } catch (error) {
        message.error('error while deleting a crew')

    }
}