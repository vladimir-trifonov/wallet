import Grid from "@mui/material/Grid"

import Balance from "./Balance"
import useEth from "../hooks/useEth"
import useErc20 from "../hooks/useErc20"
import { useSelector } from "react-redux"

const Portfolio = () => {
  useEth()
  const nexoSymbol = useErc20(process.env.REACT_APP_NEXO_ETH_MAIN_NET_CONTRACT_ADDRESS as string)
  const currencies = useSelector((state) => (state as any).currencies)

  return (
    <Grid container spacing={1}>
      {currencies?.eth && <Balance currency={currencies.eth} />}
      {!!currencies[nexoSymbol] && <Balance currency={currencies[nexoSymbol]} />}
    </Grid>
  )
}

export default Portfolio
