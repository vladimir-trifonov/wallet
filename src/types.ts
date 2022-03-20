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
  batchProvider?: any
  address?: string | null
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
      batchProvider?: Web3ConnectStateType["batchProvider"]
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
  
export type AssetType = {
  address?: string
  symbol: string
  balance?: string
  totalSupply?: string
  decimals?: number
}

export type AssetsObjectType = {
  [symbol: string]: AssetType
}

export type AssetsStateType = {
  main: {
    [address: string]: {
      assets: AssetsObjectType
    }
  }
  additional: {
    [address: string]: {
      assets: AssetsObjectType,
      initiallyLoaded: boolean
    }
  }
}

export type StateType = {
  web3Connect: Web3ConnectStateType
  assets: AssetsStateType
}

export type AssetsActionType =
  | {
    type: "UPDATE_MAIN_ASSET"
    payload: {
      asset: AssetType
      address: string
    }
  }
  | {
    type: "SET_ADDITIONAL_ASSETS"
    payload: {
      assets: AssetsObjectType
      address: string
      allLoaded: boolean
    }
  }
  | {
    type: "UPDATE_ADDITIONAL_ASSETS"
    payload: {
      assets: AssetsObjectType
      address: string
    }
  }
  | {
    type: "RESET_ASSETS"
  }