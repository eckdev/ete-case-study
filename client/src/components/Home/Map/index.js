import React,{useState} from 'react'
import { MapContainer, TileLayer, Circle,Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import MyMarker from './MyMarker'

function Map({pokemonData, setIsBattleArenaActive}) {
    const position = [51.505, -0.09];
    const fillRedOptions = { fillColor: 'green' }
    const [isBattleButtonActive, setIsBattleButtonActive] = useState(false);

    return (
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            {
                    <MapContainer style={{ height: '575px', width: '100%',zIndex:0 }} center={position} zoom={3} scrollWheelZoom={false} id="map">
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
                        <MyMarker pokemonData={pokemonData} setIsBattleButtonActive={setIsBattleButtonActive} />
                    </MapContainer>
            }
            { isBattleButtonActive ? <button onClick={() => setIsBattleArenaActive(true)}>Start Battle</button> : null }
        </div>
    )
}

export default Map
