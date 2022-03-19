import { useEffect } from "react"
import { useErrorBoundary } from "use-error-boundary"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

import AppBar from "./components/AppBar"
import Wallet from "./components/Wallet"

export const App = (): JSX.Element => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  const { chainData, web3Provider } = useSelector((state) => (state as any).web3Connect)

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
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
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
