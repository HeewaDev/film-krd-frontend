
import { message } from "antd";
import axios from "axios";

export const GetCasts = () => async (dispatch) => {

    dispatch ({type: 'LOADING', payload: true})

    try {
        const {casts} = await axios.get('http://localhost:7000/casts')
        dispatch({type: 'GET_ALL_CASTS', payload: casts})
        dispatch({type: 'LOADING', payload: false})
    } catch (error) {
        message.error('error getting casts')
        dispatch({type: "LOADING", payload: false})
    }




}




export const AddCasts = (ReqObj) => async (dispatch) => {

dispatch({type: "LOADING", payload: true})

try {
    await axios.post("http://localhost:7000/casts", ReqObj)

    dispatch({type: "CREATE_CASTS", payload: true})
    message.success('New Cast Added Succefully')
    dispatch({type: "LOADING", payload: false})

} catch (error) {

    message.error('error while creating casts')
    dispatch({type: "LOADING", payload: false})
    
}

}



export const EditCasts = (ReqObj) => async(dispatch) =>{
    dispatch({type: "LOADING", payload: true})


    try {

        await axios.post("http://localhost:7000/casts", ReqObj)
        dispatch({type: "Loading", payload: false})

        message.success('Cast Editted Succesfully')
        
    } catch (error) {
        message.error('error while edditing casts')
    }
}


export const DeleteCasts = (ReqObj) => async (dispatch) => {
    dispatch({type: "LOADING", payload: true})


    try {
        await axios.delete("http://localhost:7000/casts", ReqObj)
        dispatch({type: "LOADING", payload: false})

        message.success('Succesfully deleted a cast')
    } catch (error) {
        message.error('error while deleting a cast')

    }
}