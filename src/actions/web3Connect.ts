import { providers } from "ethers"
import { toast } from "react-toastify"
import Web3Modal from "web3modal"
import { Dispatch } from "redux"

import { getChainData } from "../helpers/utils"
import { infuraId, infuraUrl } from "../const"
import { StateType } from "../types"

export const connect = (web3Modal: Web3Modal) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const provider = await web3Modal.connect()
      const web3Provider = new providers.Web3Provider(provider)
      const batchProvider = !!infuraUrl && !!infuraId ? new providers.JsonRpcBatchProvider(`${infuraUrl}${infuraId}`) : null
      const signer = web3Provider.getSigner()
      const network = await web3Provider.getNetwork()
      const address = await signer.getAddress()
      const chainData = getChainData(network?.chainId)

      dispatch({
        type: "SET_WEB3_PROVIDER",
        payload: {
          provider,
          web3Provider,
          batchProvider,
          address: address,
          chainId: network?.chainId,
          chainData
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const disconnect = (web3Modal: Web3Modal) => {
  return async (dispatch: Dispatch<any>, getState: () => StateType) => {
    const { web3Connect } = getState()
    try {
      await web3Modal.clearCachedProvider()
      if (web3Connect.provider?.disconnect && typeof web3Connect.provider.disconnect === "function") {
        await web3Connect.provider.disconnect()
      }

      dispatch({
        type: "RESET_WEB3_PROVIDER",
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const setAddress = (address: string | null) => {
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

