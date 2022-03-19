import { combineReducers } from "redux"

import web3Connect from "./web3Connect"
import currencies from "./currencies"

const rootReducer = combineReducers({
  web3Connect,
  currencies
})

export default rootReducer