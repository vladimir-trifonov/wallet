import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { writeStorage, deleteFromStorage, useLocalStorage } from "@rehooks/local-storage"

import useBlock from "./useBlock"
import { shouldInvalidate } from "../helpers/utils"
import { getTokens } from "../services/tokens"
import { updateAdditionalTokens } from "../actions/assets"
import { invalidateTokensSourcesInMs, invalidateAdditionalTokensInMs }  from "../const"
import { AssetType, StateType } from "../types"

const useTokens = () => {
  const dispatch = useDispatch()
  const tokensLoadedTs = useRef<string | null>(null)
  const tokensSrcLoadedTs = useRef<string | null>(null)
  const [tokensSrc, setTokensSrc] = useState<AssetType[]>()
  const [tokensSrcLS] = useLocalStorage("tokensSrc")
  const [tokensLoadedTsLS] = useLocalStorage("tokensLoadedTs")
  const [tokensSrcLoadedTsLS] = useLocalStorage("tokensSrcLoadedTs")
  const address = useSelector((state: StateType) => state.web3Connect.address)
  const batchProvider = useSelector((state: StateType) => state.web3Connect.batchProvider)

  const fetchTokensSources = useCallback(async () => {
    const { tokens } = await getTokens()
    
    writeStorage("tokensSrc", tokens)
    writeStorage("tokensSrcLoadedTs", new Date().valueOf())
  }, [])

  const fetchAdditionalTokens = useCallback(async () => {
    if (!!tokensSrc && !!batchProvider && !!address) {
      // Invalidate tokens sources from local storage
      if (shouldInvalidate(Number(tokensSrcLoadedTs.current), invalidateTokensSourcesInMs)) {
        deleteFromStorage("tokensSrcLoadedTs")
      } else {
        const fetchAll = shouldInvalidate(Number(tokensLoadedTs.current), invalidateAdditionalTokensInMs)
        dispatch(updateAdditionalTokens(tokensSrc, batchProvider, address, fetchAll))
        if (fetchAll) writeStorage("tokensLoadedTs", new Date().valueOf())
      }
    }
  }, [address, batchProvider, dispatch, tokensSrc])

  useEffect(() => {
    if (tokensLoadedTsLS) tokensLoadedTs.current = tokensLoadedTsLS
  }, [tokensLoadedTsLS])

  useEffect(() => {
    if (tokensSrcLoadedTsLS) tokensSrcLoadedTs.current = tokensSrcLoadedTsLS
  }, [tokensSrcLoadedTsLS])

  useEffect(() => {
    if (tokensSrcLS) setTokensSrc(tokensSrcLS as unknown as AssetType[])
  }, [tokensSrcLS])

  useEffect(() => {
    if (shouldInvalidate(Number(tokensSrcLoadedTsLS), invalidateTokensSourcesInMs)) {
      fetchTokensSources()
    }
  }, [fetchTokensSources, tokensSrcLoadedTsLS])

  useEffect(() => {
    if (batchProvider && address && tokensSrc) fetchAdditionalTokens()
  }, [address, batchProvider, tokensSrc, fetchAdditionalTokens])

  useBlock(fetchAdditionalTokens)
}

export default useTokens