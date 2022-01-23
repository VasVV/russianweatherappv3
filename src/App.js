import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import './App.css';
import { useState, useEffect } from 'react';
import MapEvents from './mapevents';
import { useSelector, useDispatch } from 'react-redux';
import RussianCities from './russiancities';
import axios from 'axios';
import BigCitiesMarkers from './bigcitiesmarkers';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {setBigCitiesWeatherR} from './reducers/bigcitiesweather';
import {setCurrZoom} from './reducers/zoom';
import { changeCurrLatLng } from './reducers/latlng';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const bigCityLimit = 4000000;

function App() {

  const dispatch = useDispatch();
  const [weather, setWeather] = useState(null);

  const zoom = useSelector(state => state.zoom.zoom);
  const lat = useSelector(state => state.latLng?.lat);
  const lng = useSelector(state => state.latLng?.lng);

  const [showBigCities, setShowBitCities] = useState(false);
  const [bigCitiesWeather, setBigCitiesWeather] = useState([]);

  const getWeather = async(f, s) => {
    let data;
    if (f) {
      data = {lat: f, lng: s}
    } else {
      data = {lat, lng};
    }
    const response = await axios.post('http://localhost:3001/recieveweather', data);
    return response.data;
  }

  useEffect(async() => {
    const weather = await getWeather(lat, lng);
    setWeather(weather);
  },[lat])

  useEffect(async() => {
    let getBigCities = RussianCities
    .filter(e => e.population >= bigCityLimit)
    let res = await Promise.all(getBigCities.map(async e => {
      const lat = Number(e.coords.lat);
      const lon = Number(e.coords.lng);
      const weather = await getWeather(lat, lon); //?
      return {
        ...e,
        weather
      }
    }));
    setBigCitiesWeather(res);
    dispatch(setBigCitiesWeatherR(res));
    }, []);

  useEffect(() => {
    if (zoom > 12) {
      setShowBitCities(true)
    } else {
      setShowBitCities(false)
    }
  }, [zoom]);

  return (
    <div className="App">
      <MapContainer 
        center={[59.93, 30.30]} 
        zoom={10} 
        scrollWheelZoom={false}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lat && <Marker position={[lat, lng]}>
        <Popup>
                {weather?.fact.temp}
        </Popup>
        </Marker>}
      
        {
          (bigCitiesWeather.length > 0 && showBigCities)  && bigCitiesWeather.map(e =>{
            {console.log(e)}
            return (
            <Marker position={[59.95, 30.31667]}>
             <Popup>{e.weather?.fact.temp}</Popup> 
            </Marker>
            )
          })
        }

        <MapEvents />
        
      </MapContainer>
     
    </div>
  );
}

export default App;
