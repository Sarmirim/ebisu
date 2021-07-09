import { createStore, combineReducers } from 'redux'
import { coinReducer } from './coin'
import { dotsReducer } from './dots'
import { themeReducer } from './theme'

export const store = createStore(
    combineReducers({
        coin: coinReducer,
        dots: dotsReducer,
        theme: themeReducer, 
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // work with firefox
)