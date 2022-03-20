import { AssetsObjectType, AssetType, IChainData } from "../types"
import { BigNumber, utils, providers } from "ethers"

import supportedChains  from "../const/chains"
import { infuraId }  from "../const"
import { fetchTotalSupply } from "../services/tokens"

export function getChainData(chainId?: number): IChainData | null {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain: IChainData) => chain.chain_id === chainId
  )[0]

  if (!chainData) return null

  const API_KEY = infuraId

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

export const formatTokenAmount = (balance: any, decimals: number): BigNumber => {
  const decimalsBN = BigNumber.from(decimals)
  const divisor = BigNumber.from(10).pow(decimalsBN)

  const beforeDecimal = balance.div(divisor)
  const afterDecimal  = balance.mod(divisor)
  return utils.parseEther(`${beforeDecimal}.${afterDecimal}`)
}

export const resolveTokens = (
  tokens: AssetType[], 
  balances: BigNumber[], 
  getExistingAssets: () => AssetsObjectType,  
  batchProvider: providers.JsonRpcBatchProvider
): Promise<AssetType[]> => {
  if (!tokens.length || !balances.length) return Promise.resolve([])

  const tokensWithBalances =  balances.reduce((result: AssetType[], balance: BigNumber, i: number) => {
    const token = tokens[i]
    
    if (!balance.isZero()) {
      result.push({
        address: token.address,
        balance: utils.formatEther(formatTokenAmount(balance, token.decimals!)).toLocaleString(),
        symbol: token.symbol,
        decimals: token.decimals
      })
    }

    return result
  }, [])

  return resolveTokensTotalSupply(tokensWithBalances, getExistingAssets, batchProvider)
}

export const resolveTokensTotalSupply = (
  tokens: AssetType[], 
  getExistingAssets: () => AssetsObjectType, 
  batchProvider: providers.JsonRpcBatchProvider
) => {
  return Promise.all(tokens.map((token: AssetType) => {
    const existingTotalSupply = getExistingAssets()?.[token.symbol]?.totalSupply

    if (existingTotalSupply) {
      return {
        ...token,
        totalSupply: existingTotalSupply
      }
    } 
    
    return fetchTotalSupply(token, batchProvider)
  }))
}

export const shouldInvalidate = (ts: number, invalidateTs: number) => !ts || ts < new Date(Date.now() - invalidateTs).valueOf()

export const throttle = (func: any, limit: number) => {
  let inThrottle: any
  return function() {
    const args = arguments
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const tokensToObject = (tokens: AssetType[]): AssetsObjectType => {
  return tokens.reduce((result: AssetsObjectType, token: AssetType) => {
    result[token.symbol] = token
    return result
  }, {})
}
