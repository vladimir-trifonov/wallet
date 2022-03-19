import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useSelector } from "react-redux"

import { StyledBox } from "./AppBar.styles"
import { supportedChainsText } from "../const/chains"
import useWeb3Connect from "../hooks/useWeb3Connect"

export const AppBar = (): JSX.Element => {
  const { onConnect, onDisconnect } = useWeb3Connect()
  const { isUnsupportedChain, web3Provider } = useSelector((state) => (state as any).web3Connect)
 
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <StyledBox>
          <Typography sx={{ color: "#017abd" }} variant="h6" component="div">
            Wallet&nbsp;
          </Typography>
        </StyledBox>
        {isUnsupportedChain && (
          <Typography
            sx={{ color: "red", mr: 1 }}
            variant="caption"
            component="div"
          >
            Not supported chain. Switch to any of {supportedChainsText}
          </Typography>
        )}
        {web3Provider ? (
          <Button color="inherit" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button color="inherit" onClick={onConnect}>
            Connect
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
