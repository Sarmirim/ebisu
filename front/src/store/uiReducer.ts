import * as actionTypes from "./actionTypes"
import { UIAction, UIState } from './type'

const initialState: UIState = {
    settings: false
}

const reducer = (
    state: UIState = initialState,
    action: UIAction
): UIState => {
    switch (action.type) {
        case actionTypes.SWITCH_SETTINGS:
            return {
                ...state,
                settings: action.ui.settings,
            }
    }
    return state
}
  
export default reducer