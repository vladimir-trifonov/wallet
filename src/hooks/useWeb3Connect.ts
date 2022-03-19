import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3Modal from "web3modal"

import { connect, disconnect, setAddress, setIsConnected, setUnsupportedChain } from "../actions/web3Connect"

const INFURA_ID = process.env.REACT_APP_INFURA_ID

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  }
}

let web3Modal: any
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  })
}

const useWeb3Connect = (): any => {
  const dispatch = useDispatch()
  const { provider, web3Provider, chainData, address } = useSelector((state) => (state as any).web3Connect)

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      dispatch(connect(web3Modal))
    }
  }, [dispatch])

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch(setAddress(accounts[0]))
      }

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number, message: string }) => {
        dispatch(disconnect(web3Modal))
      }

      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)
      provider.on("disconnect", handleDisconnect)

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged)
          provider.removeListener("chainChanged", handleChainChanged)
          provider.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [provider, dispatch, address])

  useEffect(() => {
    dispatch(setIsConnected(!!web3Provider && !!chainData && !!address))
  }, [address, chainData, dispatch, web3Provider])

  useEffect(() => {
    dispatch(setUnsupportedChain(!!web3Provider && !chainData))
  }, [chainData, dispatch, web3Provider])

  
  const onConnect = () => dispatch(connect(web3Modal))
  const onDisconnect = () => dispatch(disconnect(web3Modal))

  return { onConnect, onDisconnect }
}

export default useWeb3Connect