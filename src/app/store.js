import { configureStore } from '@reduxjs/toolkit'
import backgroundReducer from '../features/background/backgroundSlice'
import stickersReducer from '../features/sticker/stickerSlice'
import previewReducer from '../features/preview/previewSlice'

export const store = configureStore({
  reducer: {
      background: backgroundReducer,
      stickers: stickersReducer,
      preview: previewReducer,
  },
})