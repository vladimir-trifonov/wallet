import { useEffect } from "react"
import { useSelector } from "react-redux"

import { throttle } from "../helpers/utils"
import { StateType } from "../types"

const useBlock = (cb: () => void) => {
  const isConnected = useSelector((state: StateType) => state.web3Connect.isConnected)
  const web3Provider = useSelector((state: StateType) => state.web3Connect.web3Provider)

  const throttled = throttle(cb, 60000)
  
  useEffect(() => {
    if (web3Provider?.on && isConnected) {
      web3Provider.on("block", throttled)

      return () => {
        if (web3Provider?.removeAllListeners) {
          web3Provider.removeAllListeners("block", throttled)
        }
      }
    }
  }, [web3Provider, throttled, isConnected])
}

export default useBlock