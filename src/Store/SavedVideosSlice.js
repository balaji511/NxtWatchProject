import {createSlice} from '@reduxjs/toolkit'

const savedVideosSlice = createSlice({
  name: 'saved',
  initialState: {
    isLoading: false,
    savedData: [],
  },
  reducers: {
    addItem(state, action) {
      console.log(action.payload)

      // eslint-disable-next-line no-param-reassign
      state.savedData = [...state.savedData, {...action.payload}]
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
    },
    removeItem(state, action) {
      const id = action.payload
      // eslint-disable-next-line no-param-reassign
      state.savedData = state.savedData.filter(each => each.id !== id)
    },
  },
})

export const SaveActions = savedVideosSlice.actions
export default savedVideosSlice
