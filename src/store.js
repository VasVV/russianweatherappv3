import { configureStore } from '@reduxjs/toolkit';
import bigCitiesWeather from './reducers/bigcitiesweather';
import latLng from './reducers/latlng';
import zoom from './reducers/zoom';
import { combineReducers} from 'redux'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  bigCitiesWeather: bigCitiesWeather,
  latLng: latLng,
  zoom: zoom
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});
