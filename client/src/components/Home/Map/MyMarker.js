import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { insertLogs, updatePokemon, selectMyPokemon, selectEnemyPokemon } from '../../../actions/pokemon'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../styles/home.module.css'

var selectedImages = [];
var markers = {
    myMarkers: [],
    enemyMarkers: []
};
var enemies = [];
var myPokemons = [];
var droppedPokemonIsEnemies, droppedPokemonIsAllies, isBAActive = false;
var pokeData;

function MyMarker(props) {
    pokeData = props.pokemonData;
    isBAActive = props.isBattleArenaActive;
    const leafmap = useMap();
    const dispatch = useDispatch();

    const attack = function (e) {
        let selectedEnemyPokemon = pokeData.find(x => x._id === document.getElementById("enemies-list").value);
        let myPokemon = pokeData.find(x => x._id === e.target.dataset.id);

        let distance = calcDistance(myPokemon.coordinates.lat, myPokemon.coordinates.lng, selectedEnemyPokemon.coordinates.lat, selectedEnemyPokemon.coordinates.lng);

        dispatch(insertLogs(`${myPokemon.name} attacked to ${selectedEnemyPokemon.name}`));

        let poke = {
            hp: (selectedEnemyPokemon.hp + selectedEnemyPokemon.defence) - myPokemon.attack - Math.round(distance),
            coordinates: selectedEnemyPokemon.coordinates
        }
        if (selectedEnemyPokemon.hp > 0) {
            if (poke.hp < 0) {
                poke.hp = 0;
            }
            else if (poke.hp > 100) {
                poke.hp = 100;
            }
            dispatch(updatePokemon(selectedEnemyPokemon._id, poke.hp, poke.coordinates));
            dispatch(insertLogs(`${selectedEnemyPokemon.name} ${poke.hp} HP life remaining`));

            //opposite turn
            oppositeAttack(myPokemon, selectedEnemyPokemon, distance);
        }
        else {
            dispatch(insertLogs(`${selectedEnemyPokemon.name} is dead!`));
            let defeatedMarker = markers.enemyMarkers.find(x => x._latlng.lat == selectedEnemyPokemon.coordinates.lat && x._latlng.lng == selectedEnemyPokemon.coordinates.lng);
            leafmap.removeLayer(defeatedMarker);

            markers.enemyMarkers = markers.enemyMarkers.filter(function (obj) {
                return obj._latlng.lat !== selectedEnemyPokemon.coordinates.lat && obj._latlng.lng !== selectedEnemyPokemon.coordinates.lng;
            });

            if (markers.enemyMarkers.length === 0) {
                toast.success('🚀 YOU WIN!', {
                    position: "top-center"
                });
            }
            else {
                debugger;
                enemies = enemies.filter(function (obj) {
                    return obj.coordinates.lat !== selectedEnemyPokemon.coordinates.lat && obj.coordinates.lng !== selectedEnemyPokemon.coordinates.lng;
                })
                renderSelectEnemies();
            }
        }
        dispatch(selectMyPokemon(myPokemon._id))
        dispatch(selectEnemyPokemon(selectedEnemyPokemon._id))
    }

    const oppositeAttack = function (myPokemon, selectedEnemyPokemon, distance) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                dispatch(insertLogs(`${selectedEnemyPokemon.name} attacked to ${myPokemon.name}`));
                let poke = {
                    hp: (myPokemon.hp + myPokemon.defence) - selectedEnemyPokemon.attack - Math.round(distance),
                    coordinates: myPokemon.coordinates
                }
                if (myPokemon.hp > 0) {
                    if (poke.hp < 0) {
                        poke.hp = 0;
                    }
                    else if (poke.hp > 100) {
                        poke.hp = 100;
                    }
                    dispatch(updatePokemon(myPokemon._id, poke.hp, poke.coordinates));
                    dispatch(insertLogs(`${myPokemon.name} ${poke.hp} HP life remaining`));
                }
                else {
                    let defeatedMarker = markers.myMarkers.find(x => x._latlng.lat == myPokemon.coordinates.lat && x._latlng.lng == myPokemon.coordinates.lng);
                    leafmap.removeLayer(defeatedMarker);

                    markers.myMarkers = markers.myMarkers.filter(function (obj) {
                        return obj._latlng.lat !== myPokemon.coordinates.lat && obj._latlng.lng !== myPokemon.coordinates.lng;
                    });

                    if (markers.myMarkers.length === 0) {
                        toast.success('💀 ENEMIES WIN!', {
                            position: "top-center"
                        });
                    }
                }
                resolve(true);
            }, 1000);
        });
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

    const renderSelectEnemies = () => {
        let popUpHtml = '<option value="empty">Select a enemy</option>';
        if (enemies.length > 0) {
            for (let i = 0; i < enemies.length; i++) {
                popUpHtml += `<option value="${enemies[i]._id}">${enemies[i].name}</option>`;
            }
        }
        else {
            popUpHtml = `<option>Select a Enemy</option>`;
        }

        for (let i = 0; i < markers.myMarkers.length; i++) {
            const element = markers.myMarkers[i];
            element.setPopupContent(`
            <select id="enemies-list" class="${styles.selectEnemy}">
               ${popUpHtml}
            </select>
            <button id="attack" class="${styles.attackButton}" data-id="${myPokemons[i]._id}">Attack</button>
            `)
        }
    }

    const dropEvent = function (e) {
        e.preventDefault();
        let imagePath = e.dataTransfer.getData("text/plain");
        let ev = document.createElement('html');
        ev.innerHTML = e.dataTransfer.getData('text/html');
        let draggedPictureKey = ev.getElementsByTagName('img')[0].alt;
        let droppedPokemon = pokeData.filter(x => x.name === draggedPictureKey)[0];
        droppedPokemon.isEnemy ? enemies.push(droppedPokemon) : myPokemons.push(droppedPokemon)
        let coordinates = leafmap.containerPointToLatLng(L.point([e.layerX, e.layerY]));
        let isMarkerInCircle = false;

        leafmap.eachLayer(function (layer) {
            if (layer instanceof L.Circle) {
                isMarkerInCircle = layer.getLatLng().distanceTo(coordinates) < layer.getRadius();

                if (isMarkerInCircle) {
                    if (!selectedImages.includes(imagePath)) {
                        selectedImages.push(imagePath);

                        let mark = L.marker(coordinates, {
                            icon: L.icon({ iconUrl: imagePath }),
                            draggable: true
                        }).bindTooltip(`<span>Name: ${droppedPokemon.name} Attack: ${droppedPokemon.attack} Defence: ${droppedPokemon.defence}</span>`, {
                            direction: 'left'
                        }).bindPopup(``).openPopup()
                            .addTo(leafmap);

                        if (droppedPokemon.isEnemy) {
                            mark.unbindPopup();
                            droppedPokemonIsEnemies = true;
                            markers.enemyMarkers.push(mark);

                            renderSelectEnemies();
                        }
                        else {
                            droppedPokemonIsAllies = true;
                            markers.myMarkers.push(mark);
                        }
                        dispatch(updatePokemon(droppedPokemon._id, droppedPokemon.hp, coordinates)); // update pokemon coordinates

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
                                dispatch(insertLogs(`${droppedPokemon.name} changed location LatLng(${droppedPokemon.coordinates.lat.toFixed(6)} - ${droppedPokemon.coordinates.lng.toFixed(6)}) to ${ev.target._latlng}`));
                            }


                        });

                        mark.on('popupopen', function (e) {
                            if (isBAActive) {
                                const attackButton = document.getElementById('attack');

                                let myPokemon = pokeData.find(x => x._id === attackButton.dataset.id);
                                dispatch(selectMyPokemon(myPokemon._id));

                                const enemiesList = document.getElementById('enemies-list');
                                attackButton.addEventListener('click', attack);
                                enemiesList.addEventListener('change', enemiesListChange);
                            }
                            else {
                                e.target.closePopup();
                            }
                        });

                        if (droppedPokemonIsAllies && droppedPokemonIsEnemies) {
                            props.setIsBattleButtonActive(true)
                        }
                    }
                }
            }
        }); // check layer insert on map before

    };

    const enemiesListChange = (e) => {
        let selectedEnemyPokemon = pokeData.find(x => x._id === e.target.value);
        dispatch(selectEnemyPokemon(selectedEnemyPokemon._id))
    }

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
