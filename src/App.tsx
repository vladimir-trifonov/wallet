import { useContext, useEffect } from 'react'
import { useErrorBoundary } from 'use-error-boundary'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { toast } from "react-toastify"

import { AppContext } from './context'
import { ContextType } from './types'
import AppBar from './components/AppBar'
import Wallet from './components/Wallet'

export const App = (): JSX.Element => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  const { state }: ContextType = useContext(AppContext)

  const { web3Provider, chainData } = state

  useEffect(() => {
    if (didCatch && error) {
      toast.error(error.message)
    }
  }, [didCatch, error])

  return (
    <ErrorBoundary>
      <Box>
        <AppBar />
      </Box>
      {web3Provider && chainData && (
        <Container fixed sx={{ flexGrow: 1 }}>
          <Grid
            container
            sx={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item>
              <Wallet />
            </Grid>
          </Grid>
        </Container>
      )}
    </ErrorBoundary>
  )
}

export default App
