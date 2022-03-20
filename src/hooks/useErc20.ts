import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import useBlock from "./useBlock"
import { updateMainToken } from "../actions/assets"
import { getContract } from "../helpers/ethers"
import Token from "../const/abis/Token.json"
import { getTokenSymbol } from "../services/tokens"
import { StateType } from "../types"
import { Contract } from "ethers"

const useErc20 = (contractAddress: string): any => {
  const dispatch = useDispatch()
  const [symbol, setSymbol] = useState<string | null>(null)
  const [contract, setContract] = useState<null | Contract>(null)
  const isConnected = useSelector((state: StateType) => state.web3Connect.isConnected)
  const web3Provider = useSelector((state: StateType) => state.web3Connect.web3Provider)
  const address = useSelector((state: StateType) => state.web3Connect.address)
 
  const fetchTokenSymbol = useCallback(async () => {
    try {
      const symbol = await getTokenSymbol(contract as Contract)
      setSymbol(symbol)
    } catch (e: any) {
      toast.error(e.message)
    }
  }, [contract])

  const fetchTokenAsset = useCallback(() => {
    if (!!symbol && !!contract && !!address) dispatch(updateMainToken(contract, symbol, address))
  }, [symbol, contract, address, dispatch])

  useEffect(() => {
    if (symbol) fetchTokenAsset()
  }, [fetchTokenAsset, symbol])

  useEffect(() => {
    if (contract) fetchTokenSymbol()
  }, [fetchTokenSymbol, contract])

  useEffect(() => {
    if (isConnected) {
      setContract(
        getContract(
          contractAddress as string,
          (Token as { abi: { [key: string]: any }[] }).abi,
          web3Provider.getSigner(),
        ),
      )
    } else {
      setContract(null)
    }
  }, [isConnected, contractAddress, web3Provider])

  useBlock(fetchTokenAsset)

  return symbol
}

export default useErc20