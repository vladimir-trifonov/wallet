import { useCallback, useEffect, useRef, useState } from "react"
import { utils } from "ethers"
import { toast } from "react-toastify"

import { getContract } from "../helpers/ethers"
import NexoToken from "../const/abis/NexoToken.json"

const nexoEthMainnetContractAddress = process.env.REACT_APP_NEXO_ETH_MAIN_NET_CONTRACT_ADDRESS as string

const useWeb3Balances = (state: any, dispatch: any): any => {
  const [isConnected, setIsConnected] = useState(false)
  const prevEthRef = useRef<string | null>(null)
  const prevNexoRef = useRef<string | null>(null)
  const [nexoEthMainnetContract, setNexoEthMainnetContract] = useState<null | any>(null)

  const { address, chainId, chainData, provider, web3Provider, nexo } = state

  useEffect(() => {
    setIsConnected(!!web3Provider && !!chainData && !!address)
  }, [address, chainData, web3Provider])

  const clearContracts = () => {
    setNexoEthMainnetContract(null)
  }
  
  const fetchEth = useCallback(async () => {
    const raw = await web3Provider.getBalance(address)
    const ethValue = utils.formatEther(raw).toString()
    if (ethValue !== prevEthRef.current) {
      prevEthRef.current = ethValue
      dispatch({
        type: "SET_ETH",
        eth: {
          balance: ethValue,
          symbol: chainData.native_currency.symbol,
          decimals: chainData.native_currency.decimals,
          totalSupply: "0"
        }
      })
    }
  }, [address, chainData, dispatch, web3Provider])

  const fetchNexo = useCallback(async () => {
    try {
      const balance = await nexoEthMainnetContract?.balanceOf(address)
      const nexoValue = utils.formatEther(balance).toString()
      if (nexoValue !== prevNexoRef.current) {
        prevEthRef.current = nexoValue
        dispatch({
          type: "SET_NEXO",
          nexo: {
            balance: nexoValue
          }
        })
      }
    } catch (e: any) {
      toast.error(e.message)
    }
  }, [address, dispatch, nexoEthMainnetContract])

  const fetchNexoMeta = useCallback(async (balance: string) => {
    try {
      const [symbol, decimals, totalSupply] = await Promise.all([
        nexoEthMainnetContract?.symbol(), 
        nexoEthMainnetContract?.decimals(), 
        nexoEthMainnetContract?.totalSupply()
      ])
      dispatch({
        type: "SET_NEXO",
        nexo: {
          balance,
          symbol,
          decimals,
          totalSupply
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }, [dispatch, nexoEthMainnetContract])
  
  useEffect(() => {
    if (nexo && !nexo.symbol) {
      fetchNexoMeta(nexo.balance)
    }
  }, [dispatch, fetchNexoMeta, nexo])

  const fetchBalances = useCallback(() => {
    fetchEth()
    fetchNexo()
  }, [fetchEth, fetchNexo])

  const initContracts = useCallback(
    async function () {
      try {
        setNexoEthMainnetContract(
          getContract(
            nexoEthMainnetContractAddress as string,
            (NexoToken as any).abi,
            web3Provider.getSigner(),
          ),
        )
      } catch (e: any) {
        toast.error(e.message)
      }
    },
    [web3Provider],
  )

  useEffect(() => {
    if (isConnected && chainId) {
      initContracts()
    } else {
      clearContracts()
    }
  }, [chainId, initContracts, isConnected])

  useEffect(() => {
    if (isConnected && chainId) {
      fetchEth()
    }
  }, [chainId, fetchEth, isConnected])

  useEffect(() => {
    if (nexoEthMainnetContract) {
      fetchNexo()
    }
  }, [fetchNexo, nexoEthMainnetContract])

  useEffect(() => {
    if (provider?.on) {
      provider.on('block', fetchBalances)
    }

    return () => {
      if (provider.removeListener) {
        provider.removeListener("block", fetchBalances)
      }
    }
  }, [fetchBalances, provider])
}

export default useWeb3Balances