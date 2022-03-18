import { useContext } from 'react'
import Grid from '@mui/material/Grid'

import { AppContext } from '../context'
import { ContextType } from '../types'
import Balance from "./Balance"
import useWeb3Balances from '../hooks/useWeb3Balances'

const Portfolio = () => {
  const { state, dispatch }: ContextType = useContext(AppContext)
  useWeb3Balances(state, dispatch)

  const { eth, nexo, tokens } = state

  return (
    <Grid container spacing={1}>
      <Balance currency={eth} />
      <Balance currency={nexo} />
      {!!tokens?.length && (
        tokens.map((token: any) => <Balance currency={token} />)
      )}
    </Grid>
  )
}

export default Portfolio
