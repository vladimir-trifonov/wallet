import { Web3ConnectStateType, Web3ConnectActionType } from "../types"

export const initialState: Web3ConnectStateType = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
  chainData: undefined,
  isConnected: undefined,
  isUnsupportedChain: undefined
}

const web3Connect = (state: Web3ConnectStateType = initialState, action: Web3ConnectActionType): Web3ConnectStateType => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.payload.provider,
        web3Provider: action.payload.web3Provider,
        address: action.payload.address,
        chainId: action.payload.chainId,
        chainData: action.payload.chainData,
      }
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload.address
      }
    case "SET_IS_CONNECTED":
      return {
        ...state,
        isConnected: action.payload.isConnected
      }
    case "SET_IS_UNSUPPORTED_CHAIN":
      return {
        ...state,
        isUnsupportedChain: action.payload.isUnsupportedChain
      }
    case "RESET_WEB3_PROVIDER":
      return initialState
    default:
      return state
  }
}

export default web3Connect