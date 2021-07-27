import { Fragment } from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { SearchInput } from '../inputs'
import { Title } from '../typography'

export default function CoinCard() {
    const Symbol = useSelector(state => state.coin?.Symbol)
    const Price = useSelector(state => state.coin?.Price)

    return (
        <Fragment>
            <Title>Info</Title>
            <Typography component="p" variant='h6'>
                {Price || "..."}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {Symbol || "Coin pair"}
            </Typography>
            <SearchInput/>
        </Fragment>
    )
}