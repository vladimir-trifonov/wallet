import { AssetsStateType, AssetsActionType } from "../types"

export const initialState: AssetsStateType = { main: {}, additional: {} }

const assets = (state: AssetsStateType = initialState, action: AssetsActionType): AssetsStateType => {
  switch (action.type) {
    case "UPDATE_MAIN_ASSET":
        return {
          ...state,
          main: {
            ...state.main,
            [action.payload.address]: {
              ...state.main[action.payload.address],
              assets: {
                ...state.main[action.payload.address]?.assets,
                [action.payload.asset.symbol]: {
                  ...state.main[action.payload.address]?.assets[action.payload.asset.symbol],
                  ...action.payload.asset
                }
              }
            }
          }
        }
    case "UPDATE_ADDITIONAL_ASSETS":
      return {
        ...state,
        additional: {
          ...state.additional,
          [action.payload.address]: {
            ...state.additional[action.payload.address],
            assets: {
              ...state.additional[action.payload.address]?.assets,
              ...action.payload.assets
            }
          }
        }
      }
    case "SET_ADDITIONAL_ASSETS":
      return {
        ...state,
        additional: {
          ...state.additional,
          [action.payload.address]: {
            ...state.additional[action.payload.address],
            assets: action.payload.assets,
            initiallyLoaded: true
          }
        }
      }
    case "RESET_ASSETS":
          return initialState
    default:
      return state
  }
}

export default assets