import { useContext } from 'react'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import useWeb3Connect from '../hooks/useWeb3Connect'
import { AppContext } from '../context'
import { ContextType } from '../types'
import { StyledBox } from '../App.styles'
import supportedChains from '../const/chains'

const supportedChainsText = supportedChains.map(({ name }) => name).join(', ')

export const AppBar = (): JSX.Element => {
  const { state, dispatch }: ContextType = useContext(AppContext)
  const [
    { connect, disconnect },
    { isUnsupportedChain },
  ] = useWeb3Connect(state, dispatch)

  const { web3Provider } = state

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <StyledBox>
          <Typography sx={{ color: '#017abd' }} variant="h6" component="div">
            Wallet&nbsp;
          </Typography>
        </StyledBox>
        {isUnsupportedChain && (
          <Typography
            sx={{ color: 'red', mr: 1 }}
            variant="caption"
            component="div"
          >
            Not supported chain. Switch to any of {supportedChainsText}
          </Typography>
        )}
        {web3Provider ? (
          <Button color="inherit" onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button color="inherit" onClick={connect}>
            Connect
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
