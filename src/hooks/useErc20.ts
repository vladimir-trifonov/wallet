import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { utils } from "ethers"
import { toast } from "react-toastify"

import { setCurrency } from "../actions/currencies"
import { getContract } from "../helpers/ethers"
import Token from "../const/abis/Token.json"

const useErc20 = (contractAddress: string): any => {
  const dispatch = useDispatch()
  const [symbol, setSymbol] = useState()
  const { address, web3Provider, isConnected } = useSelector((state) => (state as any).web3Connect)
  const prevBalanceRef = useRef<string| null>(null)
  const [contract, setContract] = useState<null | any>(null)

  const clearContract = () => {
    setContract(null)
  }

  const fetchMeta = useCallback(async () => {
    try {
      const [symbol, decimals, totalSupply]: any = await Promise.all([
        contract?.symbol(),
        contract?.decimals(),
        contract?.totalSupply()
      ])
      dispatch(setCurrency({ symbol, decimals, totalSupply }))
      setSymbol(symbol)
    } catch (e: any) {
      toast.error(e.message)
    }
  }, [contract, dispatch])


  const fetchBalance = useCallback(async () => {
    try {
      if (symbol) {
        const balanceRaw = await contract?.balanceOf(address)
        const balance =  utils.formatEther(balanceRaw).toString()
        if (balance !== prevBalanceRef.current) {
          prevBalanceRef.current = balance as string
          dispatch(setCurrency({ symbol, balance }))
        }
      }
    } catch (e: any) {
      toast.error(e.message)
    }
  }, [symbol, contract, address, dispatch])

  const initContract = useCallback(
    async function () {
      try {
        setContract(
          getContract(
            contractAddress as string,
            (Token as any).abi,
            web3Provider.getSigner(),
          ),
        )
      } catch (e: any) {
        toast.error(e.message)
      }
    },
    [contractAddress, web3Provider],
  )

  useEffect(() => {
    if (symbol) {
      fetchBalance()
    }
  }, [fetchBalance, symbol])

  useEffect(() => {
    if (contract) {
      fetchMeta()
    }
  }, [fetchMeta, contract])

  useEffect(() => {
    if (isConnected) {
      initContract()
    } else {
      clearContract()
    }
  }, [initContract, isConnected])

  useEffect(() => {
    if (symbol && web3Provider?.on) {
      web3Provider.on('block', fetchBalance)

      return () => {
        if (web3Provider.off) {
          web3Provider.off("block", fetchBalance)
        }
      }
    }
  }, [fetchBalance, web3Provider, symbol])

  return symbol
}

export default useErc20