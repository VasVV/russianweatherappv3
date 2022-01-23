import { createSlice } from '@reduxjs/toolkit';

export const zoom = createSlice({
    name: 'zoom',
    initialState: {zoom: 10}, 
    reducers: {
        changeCurrZoom: (state, action) => {
            state.zoom = action.payload;
        }
    }
})

export const { changeCurrZoom } = zoom.actions;

export default zoom.reducer;