import { Contract, BigNumber, utils, providers } from "ethers"

import Token from "../const/abis/Token.json"
import { formatTokenAmount, resolveTokens, tokensToObject } from "../helpers/utils"
import axios from "axios"
import { tokenSource } from "../const"
import { AssetsObjectType, AssetType } from "../types"

export const getTokens = async (): Promise<{ tokens: AssetType[] }> => {
  const response = await axios.get(tokenSource)
  return response.data
}

export const getTokenSymbol = async (contract: Contract): Promise<string> => {
  return contract.symbol()
}

export const getTokenBalance = async (contract: Contract, address: string): Promise<string> => {
  const balanceRaw = await contract?.balanceOf(address)
  return utils.formatEther(balanceRaw).toLocaleString()
}

export const getTokenMeta = async (contract: Contract): Promise<[number, string]> => {
  const [decimals, totalSupply]: [number, BigNumber] = await Promise.all([
    contract.decimals(),
    contract.totalSupply()
  ])
  
  return [decimals, utils.formatEther(formatTokenAmount(totalSupply, decimals)).toLocaleString()]
}

export const fetchTotalSupply = async (token: AssetType, batchProvider: providers.JsonRpcBatchProvider): Promise<AssetType> => {
  const contract = new Contract(token.address!, Token.abi, batchProvider)
  const totalSupply = await contract.totalSupply().catch(() => BigNumber.from(0))

  return {
    ...token,
    totalSupply: !totalSupply.isZero() && typeof token.decimals !== "undefined"
      ? utils.formatEther(formatTokenAmount(totalSupply, token.decimals)).toLocaleString() 
      : undefined
  }
}

const fetchBalance = ({ address: tokenAddress }: AssetType, batchProvider: providers.JsonRpcBatchProvider, address: string): Promise<BigNumber> => {
  const contract = new Contract(tokenAddress!, Token.abi, batchProvider)
  return contract.balanceOf(address).catch(() => BigNumber.from(0))
}

export const fetchTokensBalancesInBatches = async (
  items: AssetType[], 
  batchSize: number, 
  batchProvider: providers.JsonRpcBatchProvider, 
  address: string, 
  progressCb: (address: string, assets: any) => void,
  getAddress: () => string, 
  getExistingTokens: () => AssetsObjectType
): Promise<BigNumber[]> => {
  let position = 0
  let results: BigNumber[] = []

  while (position < items.length) {
    const itemsForBatch = items.slice(position, position + batchSize)
    const latestBatch = await Promise.all(itemsForBatch.map((item: AssetType) => fetchBalance(item, batchProvider, address)))

    results = [...results, ...latestBatch]

    if (address === getAddress()) {
      position += batchSize
      
      const assets = await resolveTokens(itemsForBatch, latestBatch, getExistingTokens, batchProvider).then(tokensToObject)

      // Intermediate result
      if (Object.keys(assets).length && position < items.length) {
        progressCb(address, assets)
      }
    } else {
      // Stop fetching on wallet address change
      position = items.length
    }
  }

  return results
}