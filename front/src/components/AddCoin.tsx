import * as React from "react"
import { ICoin } from '../store/type'

type Props = {
  saveCoin: (coin: ICoin | any) => void
}

export const AddCoin: React.FC<Props> = ({ saveCoin }) => {
    const [coin, setCoin] = React.useState<ICoin | {}>()

    const handleCoinData = (e: React.FormEvent<HTMLInputElement>) => {
        setCoin({
            ...coin,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const addNewCoin = (e: React.FormEvent) => {
        e.preventDefault()
        saveCoin(coin)
    }

    return (
        <form onSubmit={addNewCoin} className="Add-coin">
            <input
                type="text"
                id="Symbol"
                placeholder="Symbol"
                onChange={handleCoinData}
            />
            <input
                type="text"
                id="Price"
                placeholder="Description"
                onChange={handleCoinData}
            />
            <button disabled={coin === undefined ? true : false}>
                Add coin
            </button>
        </form>
    )
}