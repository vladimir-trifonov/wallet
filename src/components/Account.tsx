import { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { AppContext } from '../context'
import { ContextType } from '../types'

const Account = () => {
  const { state }: ContextType = useContext(AppContext)

  const { address, chainData } = state

  return (
    <Grid container spacing={1}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={{ color: '#017abd' }} variant="h6" component="div">
            Address&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="div">{address}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
        <Typography sx={{ color: '#017abd' }} variant="h6" component="div">
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
