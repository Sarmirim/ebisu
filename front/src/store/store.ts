import { createStore, applyMiddleware, compose, combineReducers } from "redux" // { createStore, applyMiddleware, Store }
import thunk from "redux-thunk"
import coinReducer from './coinReducer'
import themeReducer from './themeReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
	coins: coinReducer,
	theme: themeReducer,
	ui: uiReducer,
})

export const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk, ),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
	)
)