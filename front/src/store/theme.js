const initialState = {
    theme: "dark"
}

export function themeReducer(state = initialState, action) {
    switch (action.type) {
        case "theme/changeTheme":
            return { ...state, theme: action.payload }
        default:
            return state
    }
}