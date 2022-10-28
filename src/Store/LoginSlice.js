import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import {LoginApi} from '../Services/apis'

export const authentication = createAsyncThunk(
  'authenticate/user',
  async userData => {
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = fetch(LoginApi, options)
    return (await response).json()
  },
)

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    jwtToken: null,
    Loading: false,
    errorMsg: undefined,
  },
  reducers: {
    logoutFrom(state) {
      // eslint-disable-next-line no-param-reassign
      state.jwtToken = null
    },
  },

  extraReducers: {
    [authentication.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.Loading = true
    },
    [authentication.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.Loading = false
      // eslint-disable-next-line no-lone-blocks
      {
        // eslint-disable-next-line no-unused-expressions
        action.payload.jwt_token &&
          Cookies.set('jwtToken', action.payload.jwt_token)
      }
      // eslint-disable-next-line no-param-reassign
      state.jwtToken = action.payload.jwt_token
      // eslint-disable-next-line no-param-reassign
      state.errorMsg = action.payload.error_msg
    },
    [authentication.rejected]: state => {
      // eslint-disable-next-line no-param-reassign
      state.Loading = false
      // eslint-disable-next-line no-param-reassign
      state.errorMsg = 'api failed'
    },
  },
})
export const authActions = authSlice.actions
export default authSlice
