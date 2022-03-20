import { constants, utils, Contract, providers } from "ethers"

export function isAddress(value: string) {
  try {
    return utils.getAddress(value)
  } catch {
    return false
  }
}

export function getContract(address: string, ABI: any, providerOrSigner: providers.Web3Provider) {
  if (!isAddress(address) || address === constants.AddressZero) {
    throw Error(`Invalid "address" parameter "${address}".`)
  }

  return new Contract(address, ABI, providerOrSigner)
}