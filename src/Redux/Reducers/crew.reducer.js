const initialData = {
    crew: []
}


export const CrewReducer = (state=initialData, action) =>{
    switch(action.type) {
        case "GET_ALL_CREW":
            return {
                ...state,
                crew:action.payload
            }

            case "UPDATE CREW":
                return state;

            default:
                return state;
    }
}