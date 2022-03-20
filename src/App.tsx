import { useEffect } from "react"
import { useErrorBoundary } from "use-error-boundary"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

import AppBar from "./components/Bar"
import Dashboard from "./components/Dashboard"
import { StateType } from "./types"
import { StyledGrid, StyledContainer } from "./App.styles"

export const App = (): JSX.Element => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  const isConnected = useSelector((state: StateType) => state.web3Connect.isConnected)

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
      {isConnected && (
        <StyledContainer fixed>
          <StyledGrid container >
            <Grid item>
              <Dashboard />
            </Grid>
          </StyledGrid>
        </StyledContainer>
      )}
    </ErrorBoundary>
  )
}

export default App
