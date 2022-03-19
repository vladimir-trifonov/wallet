import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const Balance = ({ currency }: { currency: any }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={{ color: "#017abd" }} variant="h6" component="div">
          {currency.symbol}&nbsp;
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="div">{currency?.balance}</Typography>
      </Grid>
    </Grid>
  )
}

export default Balance
