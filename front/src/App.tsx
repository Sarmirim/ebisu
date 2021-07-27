import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import './App.css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
// import { blue, indigo } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Coin } from "./components/Coin"
import { AddCoin } from "./components/AddCoin"
import { addCoin, removeCoin } from "./store/actionCreaters"
import { Dispatch } from "redux"
import { ICoin, CoinState, ITheme, Mode } from './store/type'
import {CoinCard} from './components/cards/'
import { Header, Body } from './body'
import TemporaryDrawer from './body/Settings'

const App: React.FC = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const mode: Mode = useSelector((state: any) => state.theme.mode)

	const style = (): 'dark' | 'light' => {
		if(mode === 'system') {
			return prefersDarkMode ? Mode.dark : Mode.light
		}
		return mode
	}
	
	let theme = createTheme ({
		palette: {
			mode: style()
		},
		// direction: 'rtl',
	})

	const coins: readonly ICoin[] = useSelector(
		(state: any) => state.coins.coins,
		shallowEqual
	)

	const dispatch: Dispatch<any> = useDispatch()
	
	const saveCoin = React.useCallback(
		(coin: ICoin) => dispatch(addCoin(coin)),
		[dispatch]
	)
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<TemporaryDrawer/>
				<Header/>
				<Body/>
				{/* <h1>My Coins</h1>
				<AddCoin saveCoin={saveCoin} />
				{coins.map((coin: ICoin) => (
					<CoinCard
						key={coin.id}
						coin={coin}
					/>
					// <Coin
					// 	key={coin.id}
					// 	coin={coin}
					// 	removeCoin={removeCoin}
					// />
				))} */}
			</Box>
		</ThemeProvider>
	)
}

export default App