const initialState = {
    Symbol: "",
    Price: ""
}

export function coinReducer(state = initialState, action) {
    switch (action.type) {
        case "coin/onSearch":
            return { ...state, ...action.payload }
        default:
            return state
    }
}