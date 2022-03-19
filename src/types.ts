export interface IAssetData {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance?: string
}

export interface IChainData {
  name: string
  short_name: string
  chain: string
  network: string
  chain_id: number
  network_id: number
  rpc_url: string
  native_currency: IAssetData
}

export type Web3ConnectStateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
  chainData?: any
  isConnected?: boolean
  isUnsupportedChain?: boolean
}

export type Web3ConnectActionType =
  | {
    type: "SET_WEB3_PROVIDER"
    payload: {
      provider?: Web3ConnectStateType["provider"]
      web3Provider?: Web3ConnectStateType["web3Provider"]
      address?: Web3ConnectStateType["address"]
      chainId?: Web3ConnectStateType["chainId"]
      chainData?: Web3ConnectStateType["chainData"]
    }
  }
  | {
    type: "SET_ADDRESS"
    payload: {
      address?: Web3ConnectStateType["address"]
    }
  }
  | {
    type: "SET_IS_CONNECTED"
    payload: {
      isConnected?: Web3ConnectStateType["isConnected"]
    }
  }
  | {
    type: "SET_IS_UNSUPPORTED_CHAIN"
    payload: {
      isUnsupportedChain?: Web3ConnectStateType["isUnsupportedChain"]
    }
  }
  | {
    type: "RESET_WEB3_PROVIDER"
  }

  
export type Currency = {
  symbol: string
  balance?: string
  totalSupply?: string
  decimals?: number
}

export type CurrenciesStateType = {
  eth?: Currency
  [currency: string]: any
}

export type CurrenciesActionType =
  | {
    type: "SET_ETH"
    payload: {
      eth: CurrenciesStateType["eth"]
    }
  }
  | {
    type: "SET_CURRENCY"
    payload: {
      currency: CurrenciesStateType["currency"]
    }
  }
