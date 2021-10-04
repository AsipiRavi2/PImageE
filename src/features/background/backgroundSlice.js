import { createSlice } from '@reduxjs/toolkit'
// import bg from '../../assets/bg.jpg'

const initialState = {
    url : null
}

const backgroundSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        addBackground:(state, action)=>{
            state.url= action.payload
        }
    }
});

export const { addBackground } = backgroundSlice.actions
export default backgroundSlice.reducer