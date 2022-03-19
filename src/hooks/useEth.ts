import { useCallback, useEffect, useRef } from "react"
import { utils } from "ethers"
import { useDispatch, useSelector } from "react-redux"

import { setEth } from "../actions/currencies"

const useEth = (): any => {
  const dispatch = useDispatch()
  const prevEthRef = useRef<string | null>(null)
  const { address, chainData, web3Provider, isConnected } = useSelector((state) => (state as any).web3Connect)

  const fetchEth = useCallback(async () => {
    const raw = await web3Provider.getBalance(address)
    const ethValue = utils.formatEther(raw).toString()
    if (ethValue !== prevEthRef.current) {
      prevEthRef.current = ethValue
      
      dispatch(setEth({
        balance: ethValue,
        symbol: chainData.native_currency.symbol,
        decimals: chainData.native_currency.decimals,
        totalSupply: "0"
      }))
    }
  }, [address, chainData, dispatch, web3Provider])

  useEffect(() => {
    if (isConnected) {
      fetchEth()
    }
  }, [fetchEth, isConnected])

  useEffect(() => {
    if (isConnected && web3Provider?.on) {
      web3Provider.on("block", fetchEth)

      return () => {
        if (web3Provider.off) {
          web3Provider.off("block", fetchEth)
        }
      }
    }
  }, [fetchEth, isConnected, web3Provider])
}

export default useEth