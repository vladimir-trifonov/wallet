import { StateType, ActionType } from "./types"

export const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
  chainData: undefined,
  eth: undefined,
  nexo: undefined,
  tokens: undefined
}

const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
        chainData: action.chainData,
      }
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address
      }
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
        chainData: action.chainData
      }
    case "RESET_WEB3_PROVIDER":
      return initialState
    case "SET_ETH":
      return {
        ...state,
        eth: action.eth
      }
    case "SET_NEXO":
      return {
        ...state,
        nexo: action.nexo
      }
    default:
      throw new Error()
  }
}

export default reducer