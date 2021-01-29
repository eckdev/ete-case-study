import React,{useState} from 'react'
import { MapContainer, TileLayer, Circle,Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import MyMarker from './MyMarker'

function Map({pokemonData}) {
    const position = [51.505, -0.09];
    const fillRedOptions = { fillColor: 'green' }

    return (
        <>
            {
                    <MapContainer style={{ height: '500px', width: '70%', marginLeft:'20px' }} center={position} zoom={3} scrollWheelZoom={false} id="map">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Circle
                            center={[52.505, 29.09]}
                            pathOptions={fillRedOptions}
                            radius={2000000}
                            stroke={false}
                        >
                        </Circle>
                        <Marker position={[51,168]}></Marker>
                        <MyMarker pokemonData={pokemonData} />
                    </MapContainer>
            }
        </>
    )
}

export default Map
