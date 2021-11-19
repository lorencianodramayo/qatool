const fileReducer = (state = {}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "SET_FILE":
            return {
                data: action.payload,
            };

        case "GET_FILE":
            return {
                data: action.payload,
            };

        case "DATA_ERROR":
            return {
                error: action.payload,
            };

        default:
            return state;
    }
}

export default fileReducer;