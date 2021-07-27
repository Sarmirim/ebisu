// COIN
export interface ICoin {
    Symbol: string
    Price: string
}
  
export type CoinState = {
    coins: ICoin[]
    lastCoin: ICoin
}
  
export type CoinAction = {
    type: string
    coin: ICoin
}

// THEME
export enum Mode {
    dark = 'dark',
    light = 'light',
    system = 'system'
}

export interface ITheme {
    mode: Mode
}

export type ThemeState = {
    mode: Mode
}

export type ThemeAction = {
    type: string
    theme: ITheme
}

// UI
export type UIState = {
    settings: boolean
}

export type UIAction = {
    type: string
    ui: UIState
}

export type DispatchCoin = (args: CoinAction) => CoinAction
export type DispatchTheme = (args: ThemeAction) => ThemeAction
export type DispatchUI = (args: UIAction) => UIAction