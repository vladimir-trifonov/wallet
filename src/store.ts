import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { save, load } from "redux-localstorage-simple"

import rootReducer from "./reducers"

const preloadedStateOptions = {
  states: ["assets"],
  namespace: "wallet",
  namespaceSeparator: "::",
  disableWarnings: true
}

const composedEnhancer = composeWithDevTools(applyMiddleware(save(preloadedStateOptions), thunkMiddleware))
const store = createStore(rootReducer, load(preloadedStateOptions), composedEnhancer)

export default store