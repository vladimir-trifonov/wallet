import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3Modal from "web3modal"

import { connect, disconnect, setAddress, setIsConnected, setUnsupportedChain } from "../actions/web3Connect"
import { infuraId } from "../const"
import { StateType } from "../types"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId,
    },
  }
}

let web3Modal: Web3Modal
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  })
}

const useWeb3Connect = (): any => {
  const dispatch = useDispatch()
  const provider = useSelector((state: StateType) => state.web3Connect.provider)
  const web3Provider = useSelector((state: StateType) => state.web3Connect.web3Provider)
  const chainData = useSelector((state: StateType) => state.web3Connect.chainData)
  const address = useSelector((state: StateType) => state.web3Connect.address)

  useEffect(() => {
    if (web3Modal.cachedProvider) dispatch(connect(web3Modal))
  }, [dispatch])

  useEffect(() => {
    if (provider?.on && web3Provider) {
      const handleAccountsChanged = async () => {
        const address = await web3Provider.getSigner().getAddress()
        dispatch(setAddress(address))
      }
      const handleChainChanged = () => window.location.reload()

      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged)
          provider.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [provider, dispatch, web3Provider])

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