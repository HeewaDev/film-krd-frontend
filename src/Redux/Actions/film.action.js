
import { message } from "antd";
import axios from "axios";

export const GetFilms = () => async (dispatch) => {

    dispatch ({type: 'LOADING', payload: true})

    try {
        const {Films} = await axios.get('localhost:7000/films')
        dispatch({type: 'GET_ALL_FILMS', payload: Films})
        dispatch({type: 'LOADING', payload: false})

    } catch (error) {
        message.error('error getting Films')
        dispatch({type: "LOADING", payload: false})
    }




}




export const AddFilms = (ReqObj) => async (dispatch) => {

dispatch({type: "LOADING", payload: true})

try {
    await axios.post("localhost:7000/films", ReqObj)

    dispatch({type: "CREATE_FILMS", payload: true})
    message.success('New Film Added Succefully')
    dispatch({type: "LOADING", payload: false})

} catch (error) {

    message.error('error while creating film')
    dispatch({type: "LOADING", payload: false})
    
}

}



export const EditFilm = (ReqObj) => async(dispatch) =>{
    dispatch({type: "LOADING", payload: true})


    try {

        await axios.post("localhost:7000/films", ReqObj)
        dispatch({type: "Loading", payload: false})

        message.success('Film Editted Succesfully')
        
    } catch (error) {
        message.error('error while edditing films')
    }
}


export const DeleteFilm = (ReqObj) => async (dispatch) => {
    dispatch({type: "LOADING", payload: true})


    try {
        await axios.delete("localhost:7000/films", ReqObj)
        dispatch({type: "LOADING", payload: false})

        message.success('Succesfully deleted a film')
    } catch (error) {
        message.error('error while deleting a film')

    }
}