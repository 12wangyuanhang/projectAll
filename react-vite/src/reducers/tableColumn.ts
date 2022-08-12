import { createSlice } from '@reduxjs/toolkit';

export const columnSlice = createSlice({
    name: 'columnSlice',
    initialState:{
        columns:[],
        resultColumns:[]
    },
    reducers:{
        handleColumn: (state, action) => {
            state.resultColumns = action.payload;
        },
        changeColumns:(state, action) => {
            state.columns = action.payload;
        }
    }
})

export const { handleColumn, changeColumns } = columnSlice.actions


export default columnSlice.reducer