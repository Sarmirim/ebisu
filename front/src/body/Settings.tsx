import { ReactElement, useRef, useState, Fragment } from 'react'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Toolbar from '@material-ui/core/Toolbar'
import { Mode, ThemeState, ITheme, UIState } from '../store/type'
import { switchSettings, switchTheme } from '../store/actionCreaters'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export default function TemporaryDrawer() {
    const settings: boolean = useSelector((state: any) => state.ui.settings)
    const dispatch = useDispatch()

    const mode: Mode = useSelector((state: any) => state.theme.mode)

    function selector(mode: Mode): void {
        dispatch(switchTheme(mode))
    }

    const hoverBack = 'rgba(144, 202, 249, 0.24)'

    const buttons = [
        <Button key="one" sx={{backgroundColor: mode === 'light' ? hoverBack : null, paddingY: "12px"}} onClick={() => selector(Mode.light)}>
            <Brightness7Icon sx={{ marginRight: 1 }} /> Light
        </Button>,
        <Button key="two" sx={{backgroundColor: mode === 'system' ? hoverBack : null, paddingY: "12px"}} onClick={() => selector(Mode.system)}>
            <SettingsBrightnessIcon sx={{ marginRight: 1 }} /> System
        </Button>,
        <Button key="three" sx={{backgroundColor: mode === 'dark' ? hoverBack : null, paddingY: "12px"}} onClick={() => selector(Mode.dark)}>
            <Brightness4Icon sx={{ marginRight: 1 }} /> Dark
        </Button>,
    ]

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return
            }

            dispatch(switchSettings(open))
        }

    return (
            <Drawer
                anchor='right'
                open={settings}
                onClose={toggleDrawer(false)}
                sx={{ width: 352, display:'flex', padding: 2, justifyContent: 'space-between', zIndex: 1300 }}
            >
                {/* <Toolbar/> */}
                <Box
                    sx={{ width: 352, display:'flex', flexDirection: "row", padding: '16px 8px 16px 16px', // padding: '16px 8px 16px 16px' - <CloseIcon /> workaround
                    justifyContent: 'space-between' }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography
                        variant="h5"
                        color="inherit"
                        noWrap
                        // sx={{ flexGrow: 1 }}
                        sx={{ alignSelf: 'center' }}
                    >
                        Settings
                    </Typography>
                    <IconButton sx={{ flexGrow: 0 }} color="inherit" onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider/>
                <Box
                    sx={{ width: 352, display:'flex', flexDirection: "column", paddingX: 2 }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1, margin: "16px 0px 8px"}}
                    >
                        Mode
                    </Typography>
                    <ButtonGroup aria-label="large button group" color='inherit' sx={{ borderRadius: 20 }}>
                        {buttons}
                    </ButtonGroup>

                </Box>
                {/* <Divider sx={{margin: "16px 0px 8px"}} /> */}
            </Drawer>
    )
}