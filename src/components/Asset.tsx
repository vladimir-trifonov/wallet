import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { StyledGrid } from "./Asset.styles"

const Asset = ({ asset }: { asset: any }) => {
  return (
    <StyledGrid container sx={{ mt: 0.5, mb: 1 }}>
      <Grid item xs={6}>
        <Typography sx={{ color: "#017abd" }} variant="h6" component="div">
          {asset.symbol}&nbsp;
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography component="div" align="right">{asset?.balance}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right", mb: 1 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)"
              }}
              component="span"
            >
              Decimals: {asset.decimals}
            </Typography>
            {typeof asset.totalSupply !== "undefined" && (
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.5)"
                }}
                component="span"
              >
                &nbsp;Total Supply: {asset.totalSupply}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}

export default Asset
