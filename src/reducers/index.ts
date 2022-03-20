import { combineReducers } from "redux"

import web3Connect from "./web3Connect"
import assets from "./assets"

const rootReducer = combineReducers({
  web3Connect,
  assets
})

export default rootReducer