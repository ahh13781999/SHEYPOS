import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    loading: false,
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(item => item._id === action.payload._id)
      if(itemInCart){
        state.cartItems = state.cartItems.map((item) => {
          if(action.payload._id === item._id){
            return {...item, quantity: item.quantity+1}
          }
        })
      }else{
        state.cartItems = [...state.cartItems, action.payload]
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        return item._id == action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      })
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },

    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item._id !== action.payload._id
      })
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
  },
})

export const { addToCart, updateCart, deleteCartItem } = cartSlice.actions
export default cartSlice.reducer
