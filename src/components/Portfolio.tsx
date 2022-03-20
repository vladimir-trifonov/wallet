import Grid from "@mui/material/Grid"
import LinearProgress from "@mui/material/LinearProgress"

import Asset from "./Asset"
import { useSelector } from "react-redux"
import { StateType } from "../types"

const Portfolio = () => {
  const address = useSelector((state: StateType) => state.web3Connect.address)
  const mainAssets = useSelector(
    (state: StateType) => address ? state.assets.main[address]?.assets : null
  )
  const additionalAssets = useSelector(
    (state: StateType) => address ? state.assets.additional[address]?.assets : null
  )
  const additionalAssetsInitiallyLoaded = useSelector(
    (state: StateType) => address ? state.assets.additional[address]?.initiallyLoaded : null
  )

  return (
    <Grid container>
      {!!mainAssets &&
        Object.keys(mainAssets).length > 0 &&
        Object.keys(mainAssets).map((symbol: string) => (
          <Asset key={symbol} asset={mainAssets[symbol]} />
        ))}
      {!!additionalAssets &&
        Object.keys(additionalAssets).length > 0 &&
        Object.keys(additionalAssets).map((symbol: string) => (
          <Asset key={symbol} asset={additionalAssets[symbol]} />
        ))}
      {!additionalAssetsInitiallyLoaded && (
        <Grid container >
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Portfolio
