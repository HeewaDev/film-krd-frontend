const initialData = {
    companies: [],
}

export const CompanyReducer = (state = initialData, action) =>{
    switch(action.type){
        case "GET_ALL_COMPANIES":
        return {
            ...state,
            companies: action.payload
        }

        case "UPDATE COMPANIES":
            return state

        default:
            return state
    }
   

}