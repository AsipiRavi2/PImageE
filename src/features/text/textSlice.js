import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    textsList : []
}

const textSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        addText:(state, action)=>{
            state.textsList.push(action.payload)
        },
        changeDimensionsText:(state, action)=>{
            state.textsList[action.payload.index][action.payload.name] = action.payload.value
        },
        deleteText:(state, action)=>{
            state.textsList.splice(action.payload.index,1)
        },
    }
});

export const { addText, changeDimensionsText, deleteText } = textSlice.actions
export default textSlice.reducer