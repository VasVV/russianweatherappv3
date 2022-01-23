import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const bigCitiesWeather = createSlice({
    name: 'bigCitiesWeather',
    initialState, 
    reducers: {
        setBigCitiesWeatherR: (state, action) => {
            state = action.payload;
        }
    }
})

export const { setBigCitiesWeatherR } = bigCitiesWeather.actions;

export default bigCitiesWeather.reducer;