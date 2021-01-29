import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { insertLogs, updatePokemon } from '../../../actions/pokemon'
import styles from '../../../styles/home.module.css'

var selectedImages = [];
var markers = [];
var droppedPokemonIsEnemies, droppedPokemonIsAllies = false;
var pokeData;

function MyMarker({ pokemonData, setIsBattleButtonActive }) {
    pokeData = pokemonData;
    const [userTurn, setuserTurn] = useState(true)
    const leafmap = useMap();
    const dispatch = useDispatch();

    const attack = function (e) {

        let selectedEnemyPokemon = pokeData.find(x => x._id === document.getElementById("enemies-list").value);
        let myPokemon = pokeData.find(x => x._id === e.target.dataset.id);
        let distance = calcDistance(myPokemon.coordinates.lat, myPokemon.coordinates.lng, selectedEnemyPokemon.coordinates.lat, selectedEnemyPokemon.coordinates.lng);

        dispatch(insertLogs(`${myPokemon.name} attacked to ${selectedEnemyPokemon.name}`));
        if (userTurn) {
            let poke = {
                hp: (selectedEnemyPokemon.hp + selectedEnemyPokemon.defence) - myPokemon.attack - Math.round(distance),
                coordinates: selectedEnemyPokemon.coordinates
            }
            dispatch(updatePokemon(selectedEnemyPokemon._id, poke.hp, poke.coordinates));
            dispatch(insertLogs(`${selectedEnemyPokemon.name} HP ${poke.hp}`));
            debugger;
            if (poke.hp > 0) {
                //opposite turn
                setTimeout(() => {
                    let poke = {
                        hp: (myPokemon.hp + myPokemon.defence) - selectedEnemyPokemon.attack - Math.round(distance),
                        coordinates: myPokemon.coordinates
                    }
                    if (poke.hp > 0) {
                        dispatch(updatePokemon(myPokemon._id, poke.hp, poke.coordinates));
                        dispatch(insertLogs(`${myPokemon.name} HP ${poke.hp}`));
                    }
                    else{
                        let defeatedMarker = markers.find(x=> x._latlng.lat == myPokemon.coordinates.lat && x._latlng.lng == myPokemon.coordinates.lng);
                        leafmap.removeLayer(defeatedMarker);
                    }

                }, 1000);
            }
            else{
                let defeatedMarker = markers.find(x=> x._latlng.lat == selectedEnemyPokemon.coordinates.lat && x._latlng.lng == selectedEnemyPokemon.coordinates.lng);
                leafmap.removeLayer(defeatedMarker)
            }


            // her istekte db ye gitmesine gerek yok.
            // yenilen marker map'ten silinecek
        }

    }

    const calcDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // km
        let dLat = toRad(lat2 - lat1);
        let dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = (R * c) / 1000;
        return d;
    }

    const toRad = (Value) => {
        return Value * Math.PI / 180;
    }

    const dropEvent = function (e) {
        e.preventDefault();
        let imagePath = e.dataTransfer.getData("text/plain");
        let ev = document.createElement('html');
        ev.innerHTML = e.dataTransfer.getData('text/html');
        let draggedPictureKey = ev.getElementsByTagName('img')[0].alt;
        let droppedPokemon = pokeData.filter(x => x.name === draggedPictureKey)[0];

        let coordinates = leafmap.containerPointToLatLng(L.point([e.layerX, e.layerY]));
        let isMarkerInCircle = false;

        leafmap.eachLayer(function (layer) {
            if (layer instanceof L.Circle) {
                isMarkerInCircle = layer.getLatLng().distanceTo(coordinates) < layer.getRadius();

                if (isMarkerInCircle) {
                    if (!selectedImages.includes(imagePath)) {
                        selectedImages.push(imagePath);
                        let enemies = pokeData.filter(x => x.isEnemy);
                        let mark = L.marker(coordinates, {
                            icon: L.icon({ iconUrl: imagePath }),
                            draggable: true
                        }).bindTooltip(`<span>Name: ${droppedPokemon.name} Attack: ${droppedPokemon.attack} Defence: ${droppedPokemon.defence}</span>`, {
                            direction: 'left'
                        }).bindPopup(`
                             <select id="enemies-list"}">
                                <option value="${enemies[0]._id}">${enemies[0].name}</option>
                                <option value="${enemies[1]._id}">${enemies[1].name}</option>
                                <option value="${enemies[2]._id}">${enemies[2].name}</option>
                             </select>
                             <button id="attack" data-id="${droppedPokemon._id}">Attack</button>
                             `).openPopup()
                            .addTo(leafmap);
                        markers.push(mark);

                        if (droppedPokemon.isEnemy) {
                            mark.unbindPopup();
                        }
                        droppedPokemon.isEnemy ? droppedPokemonIsEnemies = true : droppedPokemonIsAllies = true;
                        dispatch(updatePokemon(droppedPokemon._id, droppedPokemon.hp, coordinates));
                        mark.on('dragend', function (ev) {
                            var d = leafmap.distance(ev.target._latlng, layer.getLatLng());
                            var isInside = d < layer.getRadius();
                            if (!isInside) {
                                mark.setLatLng(coordinates)
                            }
                            else {
                                let crdnt = {
                                    lat: ev.target._latlng.lat,
                                    lng: ev.target._latlng.lng
                                }
                                dispatch(updatePokemon(droppedPokemon._id, droppedPokemon.hp, crdnt));
                                dispatch(insertLogs(`${droppedPokemon.name} changed location ${droppedPokemon.lat - droppedPokemon.lng} to ${ev.target._latlng}`));
                            }


                        });

                        mark.on('popupopen', function (e) {
                            const attackButton = document.getElementById('attack');
                            attackButton.addEventListener('click', attack);
                        });

                        if (droppedPokemonIsAllies && droppedPokemonIsEnemies) {
                            setIsBattleButtonActive(true)
                        }
                    }
                }
            }
        }); // check layer insert on map before

    };

    const dragOverEvent = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    useEffect(() => {
        let leafletMap = document.getElementById('map');
        leafletMap.addEventListener('drop', dropEvent);
        leafletMap.addEventListener('dragover', dragOverEvent);

        return () => {
            leafletMap.removeEventListener('drop', dropEvent);
            leafletMap.removeEventListener('dragover', dragOverEvent);
        };
    }, [dropEvent]);


    return null;
}

export default MyMarker
