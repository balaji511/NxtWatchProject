import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {videosApi} from '../Services/apis'

export const getAllVideos = createAsyncThunk('videosData/all', async props => {
  const {cookie, InputValue} = props
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  }
  const response = fetch(`${videosApi}${InputValue}`, options)
  return (await response).json()
})

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isDark: false,
    menuView: false,
    videosInfo: {
      isLoading: false,
      videosData: [],
    },
  },
  reducers: {
    changeTheme(state) {
      // eslint-disable-next-line no-param-reassign
      state.isDark = !state.isDark
    },
    menuView(state) {
      // eslint-disable-next-line no-param-reassign
      state.menuView = !state.menuView
    },
  },
  extraReducers: {
    [getAllVideos.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.videosInfo = {
        isLoading: true,
        videosData: [],
      }
    },
    [getAllVideos.fulfilled]: (state, action) => {
      const updatedVideosData = action.payload.videos.map(each => ({
        ...each,
        thumbNail: each.thumbnail_url,
        publishedAt: each.published_at,
        viewsCount: each.view_count,
        channelName: each.channel.name,
        channelProfile: each.channel.profile_image_url,
      }))

      // eslint-disable-next-line no-param-reassign
      state.videosInfo = {
        isLoading: false,
        videosData: updatedVideosData,
      }
    },
    [getAllVideos.rejected]: () => {
      // eslint-disable-next-line no-undef
      state.videosInfo = {
        isLoading: false,
      }
    },
  },
})

export const homeActions = homeSlice.actions
export default homeSlice
