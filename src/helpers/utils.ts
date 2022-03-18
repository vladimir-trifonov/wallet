import { IChainData } from "../types"
import supportedChains  from "../const/chains"

export function getChainData(chainId?: number): IChainData | null {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain: IChainData) => chain.chain_id === chainId
  )[0]

  if (!chainData) return null

  const API_KEY = process.env.REACT_APP_INFURA_ID

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return ""
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`
}