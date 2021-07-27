import * as actionTypes from "./actionTypes"
import { ThemeAction, ThemeState, Mode } from './type'

const initialState: ThemeState = {
    mode: Mode.system
    // theme: Mode,
}

const reducer = (
    state: ThemeState = initialState,
    action: ThemeAction
): ThemeState => {
    switch (action.type) {
        case actionTypes.SWITCH_THEME:
            return {
                ...state,
                mode: action.theme.mode,
            }
    }
    return state
}
  
export default reducer