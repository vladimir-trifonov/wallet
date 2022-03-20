import { useState } from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"

import Account from "./Account"
import Portfolio from "./Portfolio"
import useEth from "../hooks/useEth"
import useErc20 from "../hooks/useErc20"
import useTokens from "../hooks/useTokens"
import { nexoContractAddress } from "../const"
import { StyledPaper, StyledBox } from "./Dashboard.styles"

const Dashboard = () => {
  useTokens()
  useEth()
  useErc20(nexoContractAddress as string)
  const [tab, setTab] = useState("portfolio")

  const handleChangeTab = (_: unknown, newValue: string) => {
    setTab(newValue)
  }

  return (
    <StyledPaper elevation={0} sx={{ p: 1 }}>
      <Box>
        <TabContext value={tab}>
          <StyledBox>
            <TabList onChange={handleChangeTab} aria-label="marketplace tabs">
              <Tab label="Portfolio" value="portfolio" />
              <Tab label="Account" value="account" />
            </TabList>
          </StyledBox>
          <TabPanel value="portfolio">
            <Portfolio />
          </TabPanel>
          <TabPanel value="account">
            <Account />
          </TabPanel>
        </TabContext>
      </Box>
    </StyledPaper>
  )
}

export default Dashboard
