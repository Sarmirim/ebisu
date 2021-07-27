import * as actionTypes from "./actionTypes"
import { ICoin, CoinState, CoinAction } from './type'

const initialState: CoinState = {
    coins: [
        {
            Symbol: "",
            Price: "",
        },
    ],
    lastCoin: {
        Symbol: "",
        Price: "",
    }
}

const reducer = (
    state: CoinState = initialState,
    action: CoinAction
): CoinState => {
    switch (action.type) {
        case actionTypes.ADD_COIN:
            // const newCoin: ICoin = {
            //     // id: state.coins.length,
            //     Symbol: action.coin.Symbol,
            //     Price: action.coin.Price,
            // }

            return {
                ...state,
                coins: state.coins.concat(action.coin),
            }
        case actionTypes.CHANGE_LAST_COIN:
            // const newLast: ICoin = {
            //     Symbol: action.coin.Symbol,
            //     Price: action.coin.Price,
            // }

            return {
                ...state,
                lastCoin: action.coin,
            }
        case actionTypes.REMOVE_COIN:
            const updateCoins: ICoin[] = state.coins.filter(
                coin => coin.Symbol !== action.coin.Symbol
            )

            return {
                ...state,
                coins: updateCoins,
            }
    }
    return state
}
  
export default reducer