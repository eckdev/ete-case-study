import React,{useState} from 'react'
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import MyMarker from './MyMarker'
import HealthProgress from './HealthProgress'
import styles from '../../../styles/home.module.css'

function Map({pokemonData, setIsBattleArenaActive,isBattleArenaActive}) {
    const position = [51.505, -0.09];
    const fillRedOptions = { fillColor: 'green' }
    const [isBattleButtonActive, setIsBattleButtonActive] = useState(false);

    return (
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            {
                isBattleArenaActive ? <HealthProgress /> : null
            }
            {
                    <MapContainer style={{ height: '575px', width: '100%',zIndex:0,marginBottom:'20px' }} center={position} zoom={3} scrollWheelZoom={false} id="map">
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
                        <MyMarker pokemonData={pokemonData} setIsBattleButtonActive={setIsBattleButtonActive} isBattleArenaActive={isBattleArenaActive} />
                    </MapContainer>
            }
            { isBattleButtonActive ? <button onClick={() => setIsBattleArenaActive(true)} className={styles.startBattleButton}>Start Battle</button> : null }
        </div>
    )
}

export default Map
