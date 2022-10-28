import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import {gamingApi} from '../Services/apis'

export const getGamingVideos = createAsyncThunk('getGamingVideos', async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwtToken')}`,
    },
  }
  const res = fetch(gamingApi, options)
  return (await res).json()
})

const gamingSlice = createSlice({
  name: 'gaming',
  initialState: {
    isLoading: false,
    gamingData: [],
  },
  extraReducers: {
    [getGamingVideos.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true
    },
    [getGamingVideos.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
      const updatedVideosData = action.payload.videos.map(each => ({
        ...each,
        thumbNail: each.thumbnail_url,
        viewsCount: each.view_count,
      }))
      // eslint-disable-next-line no-param-reassign
      state.gamingData = updatedVideosData
    },
    [getGamingVideos.rejected]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
    },
  },
})
export default gamingSlice
