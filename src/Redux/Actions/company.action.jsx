
import { message } from "antd";
import axios from "axios";

export const GetCompanies = () => async (dispatch) => {

    dispatch ({type: 'LOADING', payload: true})

    try {
        const {Companies} = await axios.get('http://localhost:7000/companies')
        dispatch({type: 'GET_ALL_COMPANIES', payload: Companies})
        dispatch({type: 'LOADING', payload: false})

    } catch (error) {
        message.error('error getting companies')
        dispatch({type: "LOADING", payload: false})
    }
}




export const AddCompany = (ReqObj) => async (dispatch) => {

dispatch({type: "LOADING", payload: true})

try {
    await axios.post("http://localhost:7000/companies", ReqObj)

    dispatch({type: "CREATE_COMPANY", payload: true})
    message.success('New Company Added Succefully')
    dispatch({type: "LOADING", payload: false})

} catch (error) {

    message.error('error while creating Company')
    dispatch({type: "LOADING", payload: false})
    
}

}



export const EditCompany = (ReqObj) => async(dispatch) =>{
    dispatch({type: "LOADING", payload: true})


    try {

        await axios.post("http://localhost:7000/companies", ReqObj)
        dispatch({type: "Loading", payload: false})

        message.success('Company Editted Succesfully')
        
    } catch (error) {
        message.error('error while edditing company')
    }
}


export const DeleteCompany = (ReqObj) => async (dispatch) => {
    dispatch({type: "LOADING", payload: true})


    try {
        await axios.delete("http://localhost:7000/companies", ReqObj)
        dispatch({type: "LOADING", payload: false})

        message.success('Succesfully deleted a company')
    } catch (error) {
        message.error('error while deleting a company')

    }
}