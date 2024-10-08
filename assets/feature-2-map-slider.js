let map;
let markers = [];
let overlay;
import { locations } from './forest-locations.js';

const fixedIconSize = 40;

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
  const { Map } = await google.maps.importLibrary("maps");

  while (!mapStylesDark || !mapStylesLight) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    styles: mapStylesLight // Default to light mode
  });

  const aboriginalLandBounds = {
    north: -11,
    south: -44.0,
    east: 154.0,
    west: 112.8,
  };

  overlay = new google.maps.GroundOverlay(
    aboriginalLandImageUrl,
    aboriginalLandBounds
  );

  setupToggle();
}

function setupToggle() {
  const toggleForest = document.getElementById('toggleMarkers');
  const toggleAboriginal = document.getElementById('toggleAboriginalOverlay');
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  const toggleLabelForest = document.querySelector('.toggle-label:nth-of-type(1)');
  const toggleLabelAboriginal = document.querySelector('.toggle-label:nth-of-type(2)');
  const sourceText = document.querySelector('.source-text');

  toggleLabelForest.textContent = toggleForest.checked ? 'After Greenfleet Impact' : 'Before Greenfleet Impact';

  toggleForest.addEventListener('change', () => {
    toggleLabelForest.textContent = toggleForest.checked ? 'After Greenfleet Impact' : 'Before Greenfleet Impact';

    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (toggleForest.checked) {
      markers = locations.map(location => {
        const marker = new google.maps.Marker({
          map: map,
          position: { lat: location.lat, lng: location.lng },
          title: location.city,
          icon: {
            url: treeIconUrl,
            scaledSize: new google.maps.Size(0, 0)
          }
        });

        let size = 1;
        const maxSize = fixedIconSize;
        const growSpeed = 2;

        function grow() {
          if (size < maxSize) {
            size += growSpeed;
            marker.setIcon({
              url: treeIconUrl,
              scaledSize: new google.maps.Size(size, size)
            });
            setTimeout(grow, 30);
          } else {
            marker.setIcon({
              url: treeIconUrl,
              scaledSize: new google.maps.Size(maxSize, maxSize)
            });
          }
        }
        
        grow();

        return marker;
      });
    }
  });

  toggleAboriginal.addEventListener('change', () => {
    sourceText.textContent = toggleAboriginal.checked ? 'Source: Adapted from "Australia\'s Indigenous land and forest estate" by National Forest Inventory 2020.' : '';

    if (toggleAboriginal.checked) {
      overlay.setMap(map);
      overlay.setOpacity(0);

      let opacity = 0;
      const fadeInSpeed = 0.05;

      function fadeIn() {
        if (opacity < 1) {
          opacity += fadeInSpeed;
          overlay.setOpacity(opacity);
          setTimeout(fadeIn, 50);
        } else {
          overlay.setOpacity(1);
        }
      }

      fadeIn();

    } else {
      let opacity = overlay.getOpacity();
      const fadeOutSpeed = 0.05;

      function fadeOut() {
        if (opacity > 0) {
          opacity -= fadeOutSpeed;
          overlay.setOpacity(opacity);
          setTimeout(fadeOut, 50);
        } else {
          overlay.setMap(null);
        }
      }

      fadeOut();
    }
  });

  toggleDarkMode.addEventListener('change', () => {
    if (toggleDarkMode.checked) {
      map.setOptions({ styles: mapStylesDark });
    } else {
      map.setOptions({ styles: mapStylesLight });
    }
  });
}

window.initMap = initMap;
window.addEventListener('load', initMap);
