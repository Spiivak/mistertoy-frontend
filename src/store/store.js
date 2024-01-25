import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer"
import { userReducer } from "./reducers/user.reducer"
import { systemReducer } from "./reducers/system.reducer"
import { reviewReducer } from "./reducers/review.reducer"

const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined

export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  console.log('**** Store state changed: ****')
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})