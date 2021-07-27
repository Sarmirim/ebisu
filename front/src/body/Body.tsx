import { useDispatch, useSelector } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MuiDrawer from '@material-ui/core/Drawer'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
// import { mainListItems, secondaryListItems } from './SideMenu'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { RenderLineChart } from '../components/charts'
import { CoinCard } from '../components/cards'
import { Button } from '@material-ui/core'
import { Coin } from '../components/Coin'
// import { SearchCard } from './cards'
import Snackbar from '@material-ui/core/Snackbar'
import Axios from 'axios'
import { ICoin } from '../store/type'
import { addCoin, changeLastCoin } from '../store/actionCreaters'

export default function Body() {
    const dispatch = useDispatch()
    const coins: ICoin[] = useSelector((state: any) => state.coins.coins)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Axios.get('localhost:8765/api/trade?symbol=btcusdt')
        (() => {
            try {
                Axios.get('http://localhost:8765/api/trade?symbol=btcusdt')
                .then((response: any)=> {
                    console.log("response: ", response)
                    let {Symbol, Price} = response.data

                    const coin: ICoin = {
                        Symbol: Symbol,
                        Price: Price
                    }
                    dispatch(changeLastCoin(coin))
                })
                .catch((e) => {
                    console.log(e)
                })
                
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    // const showNot = () =>  notification.info({
    //     message: `Symbol = ${coin.Symbol || "empty"}`,
    //     description: `Price = ${coin.Price || "empty"}`,
    // })

    // const newData = () => {
    //     const payload = [{xAxis: new Date().toLocaleTimeString('ru-RU'), price: Math.round(Math.random() * 1000)}]
    //     dispatch({type: "dots/newData", payload: payload})
    // }

    // const clearChart = () => {
    //     dispatch({type: "dots/clearArray"})
    // }

    return(
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 600,
                            }}
                        >
                        <RenderLineChart/>
                        {/* <Button type="primary" onClick={() => showNot()}>Notification</Button> */}
                        {/* <Button type="primary" onClick={() => newData()}>Random Data</Button>
                        <Button type="primary" onClick={() => clearChart()}>Clear Chart</Button> */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 200,
                                justifyContent: "center"
                            }}
                        >
                            <CoinCard />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: "start", justifyContent: "space-around" }}>
                            {/* <SearchCard/> */}
                            <Button>Random data</Button>
                            <Button>Clear</Button>
                            <Button onClick={() => {navigator.clipboard.writeText("PASTA")}}>Copy</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}