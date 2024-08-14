import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null
}

const userProfileSlice = createSlice({
  name: 'userProfil',
  initialState,
  reducers: {
    addUser: (state, value)=>{
      state.data = value.payload
    }
  }
})

export const { addUser } = userProfileSlice.actions
export default userProfileSlice.reducer