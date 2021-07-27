import * as actionTypes from "./actionTypes"
import { ICoin, CoinAction, DispatchCoin, ThemeAction, Mode, UIAction } from './type'

export function addCoin(coin: ICoin) {
    const action: CoinAction = {
        type: actionTypes.ADD_COIN,
        coin,
    }
    return action
    // return simulateHttpRequest(action)
}

export function changeLastCoin(coin: ICoin) {
    const action: CoinAction = {
        type: actionTypes.CHANGE_LAST_COIN,
        coin,
    }
    return action
    // return simulateHttpRequest(action)
}

export function removeCoin(coin: ICoin) {
    const action: CoinAction = {
        type: actionTypes.REMOVE_COIN,
        coin,
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: CoinAction) {
    return (dispatch: DispatchCoin) => {
        setTimeout(() => {
        dispatch(action)
        }, 500)
    }
}

export function switchTheme(mode: Mode) {
    const action: ThemeAction = {
        type: actionTypes.SWITCH_THEME,
        theme: {mode},
    }
    return action
}

export function switchSettings(settings: boolean) {
    const action: UIAction = {
        type: actionTypes.SWITCH_SETTINGS,
        ui: {settings},
    }
    return action
}