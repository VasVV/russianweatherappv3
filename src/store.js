import { configureStore } from '@reduxjs/toolkit';
import bigCitiesWeather from './reducers/bigcitiesweather';
import latLng from './reducers/latlng';
import zoom from './reducers/zoom';

export const store = configureStore({
  reducer: {
    bigCitiesWeather: bigCitiesWeather,
    latLng: latLng,
    zoom: zoom
  },
  devTools: true,
});
