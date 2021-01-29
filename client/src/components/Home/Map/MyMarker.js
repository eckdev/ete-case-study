import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import {insertLogs} from '../../../actions/pokemon'


var selectedImages = [];
function MyMarker({pokemonData}) {
  const leafmap = useMap();
 const dispatch = useDispatch();

  const dropEvent = function(e) {
    e.preventDefault();
    let imagePath = e.dataTransfer.getData("text/plain");
    let ev = document.createElement('html');
    ev.innerHTML= e.dataTransfer.getData('text/html');
    let draggedPictureKey = ev.getElementsByTagName('img')[0].alt;
    let draggedPokemon = pokemonData.filter(x=> x.name === draggedPictureKey);

    let coordinates = leafmap.containerPointToLatLng(L.point([e.layerX, e.layerY]));
    let isMarkerInCircle = false;
   
    leafmap.eachLayer(function (layer) {
      if (layer instanceof L.Circle) {
        isMarkerInCircle = layer.getLatLng().distanceTo(coordinates) < layer.getRadius();  
        if (isMarkerInCircle) {
          if (!selectedImages.includes(imagePath)) {
            selectedImages.push(imagePath);
            let mark =L.marker(coordinates, {
              icon: L.icon({ iconUrl: imagePath }),
              draggable: true
            }).bindTooltip(`<span>Attack: ${draggedPokemon[0].attack} Defence: ${draggedPokemon[0].defence}</span>`, { direction: 'left' }).addTo(leafmap);
            
            
            mark.on('dragend', async function(ev) {
            dispatch(insertLogs(`${draggedPokemon[0].name} changed location ${layer.getLatLng()} to ${ev.target._latlng}`));
              var d = leafmap.distance(ev.target._latlng, layer.getLatLng());
              var isInside = d < layer.getRadius();
              if (!isInside) {
                mark.setLatLng(coordinates)
              }
          });

          mark.on('click',function () {
            alert('click')
          })
          }
        }
      }
    }); // check layer insert on map before

  };

  const dragOverEvent = function(e) {
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
