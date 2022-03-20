import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useSelector } from "react-redux"

import { StateType } from "../types"

const Account = () => {
  const address = useSelector((state: StateType) => state.web3Connect.address)
  const chainData = useSelector((state: StateType) => state.web3Connect.chainData)

  return (
    <Grid container spacing={1}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={{ color: "#017abd" }} variant="h6" component="div">
            Address&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="div">{address}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
        <Typography sx={{ color: "#017abd" }} variant="h6" component="div">
          Network&nbsp;
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography component="div">{chainData?.name}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Account
