export const setEth = (eth: any) => {
  return {
    type: "SET_ETH",
    payload: {
      eth
    }
  }
}

export const setCurrency = (currency: any) => {
  return {
    type: "SET_CURRENCY",
    payload: {
      currency
    }
  }
}