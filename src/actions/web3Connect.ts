import { providers } from "ethers"
import { toast } from "react-toastify"
import { getChainData } from "../helpers/utils"

export const connect = (web3Modal: any) => {
  return async (dispatch: any) => {
    try {
      const provider = await web3Modal.connect()
      const web3Provider = new providers.Web3Provider(provider)
      const signer = web3Provider.getSigner()
      const network = await web3Provider.getNetwork()
      const address = await signer.getAddress()
      const chainData = getChainData(network?.chainId)

      dispatch({
        type: "SET_WEB3_PROVIDER",
        payload: {
          provider,
          web3Provider,
          address,
          chainId: network?.chainId,
          chainData
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const disconnect = (web3Modal: any) => {
  return async (dispatch: any, getState: any) => {
    const { provider } = getState()
    try {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect()
      }

      dispatch({
        type: "RESET_WEB3_PROVIDER",
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const setAddress = (address: string) => {
  return {
    type: "SET_ADDRESS",
    payload: {
      address
    }
  }
}

export const setIsConnected = (isConnected: boolean) => {
  return {
    type: "SET_IS_CONNECTED",
    payload: {
      isConnected
    }
  }
}

export const setUnsupportedChain = (isUnsupportedChain: boolean) => {
  return {
    type: "SET_IS_UNSUPPORTED_CHAIN",
    payload: {
      isUnsupportedChain
    }
  }
}

