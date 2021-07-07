const initialState = {
    array: []
}

export function dotsReducer(state = initialState, action) {
    switch (action.type) {
        case "dots/newData":
            return { ...state, array: [...state.array, ...action.payload] }
        case "dots/clearArray":
            return {...state, array: [] }
        default:
            return state
    }
}