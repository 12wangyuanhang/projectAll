import { createSlice, configureStore } from '@reduxjs/toolkit';

import noteReducer from '../reducers/notes';
import tableColumn from '../reducers/tableColumn';
export default configureStore({
    reducer: {
        note: noteReducer,
        tableColumn:tableColumn,
    }
})