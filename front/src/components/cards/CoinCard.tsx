import { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { ICoin } from '../../store/type'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'

type Props = {
    // coin: ICoin
}

export const CoinCard: React.FC<Props> = () => {
    const coin: ICoin = useSelector((state: any) => state.coins.lastCoin)

    return (
        <Fragment>
            <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", }}>
                {/* <Title>Info</Title> */}
                <Typography component="p" variant='h6'>
                    { coin.Symbol || "empty" }
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    { parseFloat(coin.Price) || "$ 0.0" }
                </Typography>
                {/* <SearchInput/> */}
            </Container>
        </Fragment>
    )
}