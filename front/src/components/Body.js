import { Layout, Menu, notification } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MuiDrawer from '@material-ui/core/Drawer'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { useState } from 'react'
import { mainListItems, secondaryListItems } from './SideMenu'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { RenderLineChart } from './charts'
import { CoinCard } from './cards'
import { Button } from '@material-ui/core'
import { SearchCard } from './cards'

const { SubMenu } = Menu
const { Content, Sider } = Layout
const drawerWidth = 240

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
            }),
        },
    }),
)

function Body() {
    const dispatch = useDispatch()
    const coin = useSelector(state => state.coin)
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const showNot = () =>  notification.info({
        message: `Symbol = ${coin.Symbol || "empty"}`,
        description: `Price = ${coin.Price || "empty"}`,
    })

    const newData = () => {
        const payload = [{xAxis: new Date().toLocaleTimeString('ru-RU'), price: Math.round(Math.random() * 1000)}]
        dispatch({type: "dots/newData", payload: payload})
    }

    const clearChart = () => {
        dispatch({type: "dots/clearArray"})
    }

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
                        <Button type="primary" onClick={() => newData()}>Random Data</Button>
                        <Button type="primary" onClick={() => clearChart()}>Clear Chart</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                            }}
                        >
                            <CoinCard/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SearchCard/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Body