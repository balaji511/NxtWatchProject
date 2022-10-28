import {configureStore} from '@reduxjs/toolkit'
import authSlice from './LoginSlice'
import homeSlice from './HomeSlice'
import getVideoSlice from './VideoIdSlice'
import trendingSlice from './TredingSlice'
import gamingSlice from './GamingSlice'
import savedVideosSlice from './SavedVideosSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    videoId: getVideoSlice.reducer,
    trending: trendingSlice.reducer,
    gaming: gamingSlice.reducer,
    saved: savedVideosSlice.reducer,
  },
})

export default store
