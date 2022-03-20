import { utils, providers } from "ethers"
      
export const getEthBalance = async (web3Provider: providers.Web3Provider, address: string): Promise<string> => {
  const raw = await web3Provider.getBalance(address)
  return utils.formatEther(raw).toLocaleString()
}