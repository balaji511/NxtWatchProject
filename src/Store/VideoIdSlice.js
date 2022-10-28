import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getVideoWithId = createAsyncThunk('videoId/data', async props => {
  const {id, cookie} = props
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  }

  const response = fetch(`https://apis.ccbp.in/videos/${id}`, options)
  return (await response).json()
})
const getVideoSlice = createSlice({
  name: 'video',
  initialState: {
    videoWithId: {
      isLoading: false,
      videoIdData: {},
    },
  },
  extraReducers: {
    [getVideoWithId.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.videoWithId = {isLoading: true, videoIdData: {}}
    },
    [getVideoWithId.fulfilled]: (state, action) => {
      const updatedVideoData = {
        channelName: action.payload.video_details.channel.name,
        videoUrl: action.payload.video_details.video_url,
        channelImage: action.payload.video_details.channel.profile_image_url,
        channelSubsCount: action.payload.video_details.channel.subscriber_count,
        publishedDate: action.payload.video_details.published_at,
        thumbnail: action.payload.video_details.thumbnail_url,
        viewsCount: action.payload.video_details.view_count,
        ...action.payload.video_details,
      }

      // eslint-disable-next-line no-param-reassign
      state.videoWithId = {
        isLoading: false,
        videoIdData: updatedVideoData,
      }
    },
    [getVideoWithId.rejected]: () => {
      console.log('rejected')
    },
  },
})

export default getVideoSlice
