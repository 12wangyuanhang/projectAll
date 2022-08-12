import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
    name: 'note',
    initialState:{
        currentNote:{}
    },
    reducers:{
        upData: (state, action) => {
            state.currentNote = action.payload
        }
    }
})

export const { upData } = noteSlice.actions


export default noteSlice.reducer