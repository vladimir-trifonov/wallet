export const tokenSource = "https://tokens.coingecko.com/uniswap/all.json"
export const infuraId = process.env.REACT_APP_INFURA_ID
export const infuraUrl = process.env.REACT_APP_INFURA_URL
export const nexoContractAddress = process.env.REACT_APP_NEXO_ETH_MAIN_NET_CONTRACT_ADDRESS
export const invalidateTokensSourcesInMs = process.env.REACT_APP_INVALIDATE_TOKENS_SOURCES_IN_MS 
  ? parseInt(process.env.REACT_APP_INVALIDATE_TOKENS_SOURCES_IN_MS) 
  : 43200000 // 12 hours
export const invalidateAdditionalTokensInMs = process.env.REACT_APP_INVALIDATE_ADDITIONAL_TOKENS_IN_MS 
  ? parseInt(process.env.REACT_APP_INVALIDATE_ADDITIONAL_TOKENS_IN_MS) 
  : 900000 // 15 minutes