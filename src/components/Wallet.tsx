import { useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Account from "./Account"
import Portfolio from "./Portfolio"

const Wallet = () => {
  const [tab, setTab] = useState("portfolio")

  const handleChangeTab = (_: any, newValue: string) => {
    setTab(newValue)
  }

  return (
    <Paper elevation={0} sx={{ p: 1.5, width: 600, minHeight: 400, maxHeight: "80vh" }}>
      <Box>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="marketplace tabs">
              <Tab label="Portfolio" value="portfolio" />
              <Tab label="Account" value="account" />
            </TabList>
          </Box>
          <TabPanel value="portfolio">
            <Portfolio />
          </TabPanel>
          <TabPanel value="account">
            <Account />
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  )
}

export default Wallet
