const initialData = {
    films: [],
}


export const FilmsReducer = (state = initialData, action) => {
    switch(action.type) {

        case "GET_ALL_FILMS":
            return {
                ...state,
                films: action.payload
            }

            case "UPDATE FILMS":
                return state;


            default:
                return state;
    }
}