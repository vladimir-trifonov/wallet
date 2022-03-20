import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ThemeProvider, createTheme } from "@mui/material"
import { toast, ToastContainer } from "react-toastify"
import CssBaseline from "@mui/material/CssBaseline"
import darkScrollbar from "@mui/material/darkScrollbar"
import "react-toastify/dist/ReactToastify.css"

import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import store from "./store"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          ...darkScrollbar(),
          scrollbarWidth: "thin"
        }
      }
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
        <ToastContainer
          icon={false}
          theme="dark"
          position={toast.POSITION.TOP_CENTER}
        />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
