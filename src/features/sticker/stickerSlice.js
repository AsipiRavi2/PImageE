import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stickersList : []
}

const stickerSlice = createSlice({
    name: 'stickers',
    initialState,
    reducers: {
        addSticker:(state, action)=>{
            state.stickersList.push(action.payload)
        },
        changeDimensions:(state, action)=>{
            state.stickersList[action.payload.index][action.payload.name] = action.payload.value
        },

        deleteSticker:(state, action)=>{
            state.stickersList.splice(action.payload.index,1)
        },
    }
});

export const { addSticker, changeDimensions, deleteSticker } = stickerSlice.actions
export default stickerSlice.reducer