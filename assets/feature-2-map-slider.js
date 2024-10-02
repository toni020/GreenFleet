let map;
let markers = [];
let grassMarkers = [];
let overlay;
const locations = [
  { lat: -34.2923902, lng: 149.7934873, city: 'Canberra' },
  { lat: -35.282, lng: 149.128, city: 'Canberra' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  { lat: -27.4698, lng: 153.0251, city: 'Brisbane' },
  { lat: -31.9505, lng: 115.8605, city: 'Perth' },
  { lat: -12.4634, lng: 130.8456, city: 'Darwin' }
];

const fixedIconSize = 40;

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
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

function growGrass(location) {
  const grassCount = Math.floor(Math.random() * 3) + 4;
  const grasses = [];
  
  for (let i = 0; i < grassCount; i++) {
    const distance = Math.random() * 0.02 + 0.02; 
    const angle = Math.random() * 2 * Math.PI;

    const grassLocation = {
      lat: location.lat + (distance * Math.sin(angle)),
      lng: location.lng + (distance * Math.cos(angle))
    };

    const grassSize = Math.floor(fixedIconSize * (Math.random() * 0.2 + 0.33));

    const grassMarker = new google.maps.Marker({
      map: map,
      position: grassLocation,
      icon: {
        url: grassIconUrl,
        scaledSize: new google.maps.Size(grassSize, grassSize)
      }
    });

    let grassSizeCurrent = 1;
    const maxGrassSize = grassSize;
    const grassGrowSpeed = 2;

    function growGrassAnimation() {
      if (grassSizeCurrent < maxGrassSize) {
        grassSizeCurrent += grassGrowSpeed;
        grassMarker.setIcon({
          url: grassIconUrl,
          scaledSize: new google.maps.Size(grassSizeCurrent, grassSizeCurrent)
        });
        setTimeout(growGrassAnimation, 30);
      } else {
        grassMarker.setIcon({
          url: grassIconUrl,
          scaledSize: new google.maps.Size(maxGrassSize, maxGrassSize)
        });
      }
    }

    growGrassAnimation();

    grasses.push(grassMarker);
  }

  return grasses;
}

function setupToggle() {
  const toggleForest = document.getElementById('toggleMarkers');
  const toggleAboriginal = document.getElementById('toggleAboriginalOverlay');
  const toggleLabelForest = document.querySelector('.toggle-label:nth-of-type(1)');
  const toggleLabelAboriginal = document.querySelector('.toggle-label:nth-of-type(2)');
  const sourceText = document.querySelector('.source-text');

  toggleLabelForest.textContent = toggleForest.checked ? 'After Greenfleet Impact' : 'Before Greenfleet Impact';

  toggleForest.addEventListener('change', () => {
    toggleLabelForest.textContent = toggleForest.checked ? 'After Greenfleet Impact' : 'Before Greenfleet Impact';

    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    grassMarkers.forEach(marker => marker.setMap(null));
    grassMarkers = [];

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
            grassMarkers = grassMarkers.concat(growGrass(location));
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
}

window.initMap = initMap;
window.addEventListener('load', initMap);
