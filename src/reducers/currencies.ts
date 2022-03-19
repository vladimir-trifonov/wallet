import { CurrenciesStateType, CurrenciesActionType } from "../types"

export const initialState: CurrenciesStateType = {
  eth: undefined
}

const currencies = (state: CurrenciesStateType = initialState, action: CurrenciesActionType): CurrenciesStateType => {
  switch (action.type) {
    case "SET_ETH":
      return {
        ...state,
        eth: action.payload.eth
      }
    case "SET_CURRENCY":
        return {
          ...state,
          [action.payload.currency.symbol]: {
            ...state[action.payload.currency.symbol],
            ...action.payload.currency
          }
        }
    default:
      return state
  }
}

export default currencies