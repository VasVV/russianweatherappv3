import {useState} from 'react';
import {useSelector} from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function BigCitiesMarkers() {
    const markers = useSelector(state => state.bigCitiesWeather);
    const zoom = useSelector(state => state.zoom);
  
    return (
        <>
        {zoom > 12 ? markers.map(e => {
          
            <Marker position={[59.95, 30.31]}>
              
              <Popup>
                {e.name}
              </Popup>
        </Marker>
          }) : ''}
        </>
      
    );
  }

export default BigCitiesMarkers;