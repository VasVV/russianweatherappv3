import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useDispatch } from 'react-redux';
import { changeCurrZoom } from './reducers/zoom';
import { changeCurrLatLng } from './reducers/latlng';

export default function MapEvents () {
    const dispatch = useDispatch();
    useMapEvents({
      click(e) {

        let lat = e.latlng.lat;
        let lng = e.latlng.lng;
        dispatch( changeCurrLatLng({lat, lng}) ); 
      },
      zoomend(e) {
          dispatch( changeCurrZoom(e.target._zoom) )
      }
    });
    return false;
  }