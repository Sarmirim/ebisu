import './App.css'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Head, Foot, Body } from './components'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useSelector } from 'react-redux'
// import { blue, indigo } from '@material-ui/core/colors'
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const mode = useSelector((state) => state.style.theme)

	const theme = createTheme ({
		palette: {
			mode: mode
			// mode: prefersDarkMode ? 'dark' : 'light',
			// secondary: {
			// 	main: blue[900]
			// },
			// primary: {
			// 	main: indigo[700]
			// }
		},
		typography: {
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				'"Lato"',
				'sans-serif'
			].join(',')
		}
	})
	
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
            	<CssBaseline />
				<Head/>
				<Body/>
			</Box>
			{/* <Foot/> */}
		</ThemeProvider>
	)
}

export default App