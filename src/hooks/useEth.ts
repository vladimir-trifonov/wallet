import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import useBlock from "./useBlock"
import { updateEthCurrency } from "../actions/assets"
import { StateType } from "../types"

const useEth = (): any => {
  const dispatch = useDispatch()
  const [symbol, setSymbol] = useState<string | null>(null)
  const isConnected = useSelector((state: StateType) => state.web3Connect.isConnected)
  const web3Provider = useSelector((state: StateType) => state.web3Connect.web3Provider)
  const chainData = useSelector((state: StateType) => state.web3Connect.chainData)
  const address = useSelector((state: StateType) => state.web3Connect.address)

  const fetchEthCurrency = useCallback(() => {
    if (!!symbol && isConnected) {
      dispatch(updateEthCurrency(symbol, web3Provider, address!, chainData))
    }
  }, [symbol, isConnected, dispatch, web3Provider, address, chainData])

  useEffect(() => {
    if (symbol) fetchEthCurrency()
  }, [fetchEthCurrency, symbol])

  useEffect(() => {
    if (isConnected) {
      const symbol = chainData.native_currency.symbol
      setSymbol(symbol)
    }
  }, [chainData, setSymbol, isConnected])

  useBlock(fetchEthCurrency)
  
  return symbol
}

export default useEth