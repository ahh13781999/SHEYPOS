import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cartSlice from './cartSlice'
import alertSlice from "./alertSlice"

const rootReducer = combineReducers({
  carts: cartSlice,
  alerts: alertSlice
})

const store = configureStore({
   reducer: rootReducer
})
export default store