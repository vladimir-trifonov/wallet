import { toast } from "react-toastify"
import { Dispatch } from "redux"
import { Contract, providers } from "ethers"

import { resolveTokens, tokensToObject } from "../helpers/utils"
import { fetchTokensBalancesInBatches, getTokenBalance, getTokenMeta } from "../services/tokens"
import { getEthBalance } from "../services/currencies"
import { AssetsObjectType, AssetType, IChainData, StateType } from "../types"

export const updateMainToken = (contract: Contract, symbol: string, address: string) => {
  return async (dispatch: Dispatch<any>, getState: () => StateType) => {
    try {
      const { assets } = getState()

      const asset: any = { symbol }
      asset.balance = await getTokenBalance(contract, address)

      // On initial loading
      if (!assets.main[address]?.assets?.[symbol]) {
        const [decimals, totalSupply]: [number, string] = await getTokenMeta(contract)

        asset.decimals = decimals
        asset.totalSupply = totalSupply
      }

      dispatch({
        type: "UPDATE_MAIN_ASSET",
        payload: {
          address,
          asset
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const updateEthCurrency = (symbol: string, web3Provider: providers.Web3Provider, address: string, chainData: IChainData) => {
  return async (dispatch: Dispatch<any>, getState: () => StateType) => {
    try {
      const { assets } = getState()

      const asset: any = { symbol }
      asset.balance = await getEthBalance(web3Provider, address)

      // On initial loading
      if (!assets.main[address]?.assets?.[symbol]) asset.decimals = chainData.native_currency.decimals

      dispatch({
        type: "UPDATE_MAIN_ASSET",
        payload: {
          address,
          asset
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const updateAdditionalTokens = (
  tokensSrc: AssetType[], 
  batchProvider: providers.JsonRpcBatchProvider, 
  address: string, 
  updateAll: boolean
) => {
  return async (dispatch: Dispatch<any>, getState: () => StateType) => {
    try {
      const progressCb = (address: string, assets: AssetsObjectType) => {
        dispatch({
          type: "UPDATE_ADDITIONAL_ASSETS",
          payload: {
            address,
            assets
          }
        })
      }
      const getAddress = () => getState().web3Connect.address!
      const getExistingTokens = () => getState().assets.additional[address]?.assets

      let filtered = tokensSrc.filter(({ address }) => !!address)

      // Load only additional tokens which has balances, i.e. partial fetch
      if (!updateAll && !!getState().assets.additional[address]?.initiallyLoaded) {
        const existingTokensSymbols = Object.keys(getState().assets.additional[getState().web3Connect.address!]?.assets || {})
        filtered = tokensSrc.filter(({ symbol }: { symbol: string }) => existingTokensSymbols.includes(symbol))
      }

      const [assets, allFetched] = await fetchTokensBalancesInBatches(
          filtered, 
          500, 
          batchProvider, 
          address, 
          progressCb, 
          getAddress, 
          getExistingTokens
        ).then(async (balances) => {
          const assets = await resolveTokens(filtered, balances, getExistingTokens, batchProvider).then(tokensToObject)
          return [assets, balances.length === filtered.length]
        })

      const type = allFetched ? "SET_ADDITIONAL_ASSETS" : "UPDATE_ADDITIONAL_ASSETS"

      dispatch({
        type,
        payload: {
          address,
          assets
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }
}

export const resetAssets = () => {
  return {
    type: "RESET_ASSETS"
  }
}