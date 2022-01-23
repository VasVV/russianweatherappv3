import { createSlice } from '@reduxjs/toolkit';

export const latLng = createSlice({
    name: 'latLng',
    initialState: {lat: 59.02, lng: 33.04}, 
    reducers: {
        changeCurrLatLng: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
})

export const { changeCurrLatLng } = latLng.actions;

export default latLng.reducer;