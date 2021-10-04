import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    display: 'none',
}

const previewSlice = createSlice({
    name: 'preview',
    initialState,
    reducers: {
        previewImage:(state)=>{
            state.display ==='none' ? state.display = 'flex' : state.display = 'none'
        }
    }
});

export const { previewImage } = previewSlice.actions
export default previewSlice.reducer