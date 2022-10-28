import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import {TrendingApi} from '../Services/apis'

export const getTrendingData = createAsyncThunk('trendingData', async () => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get('jwtToken')}`,
    },
  }
  const res = fetch(TrendingApi, options)

  return (await res).json()
})

const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    isLoading: false,
    trendingData: [],
  },
  extraReducers: {
    [getTrendingData.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true
    },
    [getTrendingData.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
      console.log(action.payload)

      const updatedVideosData = action.payload.videos.map(each => ({
        ...each,
        thumbNail: each.thumbnail_url,
        publishedAt: each.published_at,
        viewsCount: each.view_count,
        channelName: each.channel.name,
        channelProfile: each.channel.profile_image_url,
      }))
      // eslint-disable-next-line no-param-reassign
      state.trendingData = updatedVideosData
    },
  },
})

export default trendingSlice
