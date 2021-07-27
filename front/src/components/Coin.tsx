import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { ICoin } from '../store/type'

type Props = {
    coin: ICoin
    removeCoin: (coin: ICoin) => void
}

export const Coin: React.FC<Props> = ({ coin, removeCoin }) => {
    const dispatch: Dispatch<any> = useDispatch()

    const deleteCoin = React.useCallback(
        (coin: ICoin) => dispatch(removeCoin(coin)),
        [dispatch, removeCoin]
    )

    return (
        <div className="Coin">
        <div>
            <h1>{coin.Symbol}</h1>
            <p>{coin.Price}</p>
        </div>
        <button onClick={() => deleteCoin(coin)}>Delete</button>
        </div>
    )
}