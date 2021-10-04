import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const downloadSlice = createSlice({
    name: 'download',
    initialState,
    reducers: {
        downloadImage:(state)=>{
            
        }
    }
});

export const { download } = downloadSlice.actions
export default downloadSlice.reducer