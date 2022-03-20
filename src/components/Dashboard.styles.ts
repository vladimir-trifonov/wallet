import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"

export const StyledPaper = styled(Paper)({
  width: 600, 
  minHeight: 400, 
  maxHeight: "80vh", 
  overflow: "auto"
})

export const StyledBox = styled(Box)(() => ({
  borderBottom: 1, borderColor: "divider"
}))