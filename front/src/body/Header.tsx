import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MuiDrawer from '@material-ui/core/Drawer'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { ReactElement, useRef, useState } from 'react'
import { mainListItems, secondaryListItems } from './SideMenu'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
// import { RenderLineChart } from './charts'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
// import { CoinCard } from '../cards'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { useEffect } from 'react'
import { Mode, ThemeState, ITheme } from '../store/type'
import { switchSettings, switchTheme } from '../store/actionCreaters'
import TemporaryDrawer from './Settings'
import SettingsIcon from '@material-ui/icons/Settings'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
        }),
        }),
}))

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

export default function MyHeader() {
    const [open, setOpen] = useState(false)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const dispatch = useDispatch()

    // const switchTheme: any = React.useCallback(
	// 	(theme: ITheme) => dispatch(switchTheme(theme.mode)),
	// 	[dispatch]
	// )

    const newData = () => {
        const payload = [{xAxis: new Date().toLocaleTimeString('ru-RU'), price: Math.round(Math.random() * 1000)}]
        dispatch({type: "dots/newData", payload: payload})
    }

    const clearChart = () => {
        dispatch({type: "dots/clearArray"})
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position='absolute' open={open} >
                <Toolbar
                    sx={{
                        pr: 0
                        // pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ alignSelf: 'center', flexGrow: 1 }}
                        >
                            EBISU
                        </Typography>

                        {/* <IconButton color="inherit" onClick={swi}>
                            {renderSwitch(mode)}
                        </IconButton> */}

                        <IconButton color="inherit" onClick={() => {dispatch(switchSettings(true))}} >
                            <SettingsIcon />
                            {/* <TemporaryDrawer/> */}
                        </IconButton>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                {/* <Divider /> */}
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
        </Box>
    )
}