import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  data: null
}

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    addAuthData: (state, value) => {
      state.data = value.payload
    }
  }
})

export const { addAuthData } = userAuthSlice.actions
export default userAuthSlice.reducer