let map;
let markers = [];
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

function setupToggle() {
  const toggleForest = document.getElementById('toggleMarkers');
  const toggleAboriginal = document.getElementById('toggleAboriginalOverlay');
  const toggleDarkMode = document.getElementById('toggleDarkMode'); // Added Dark Mode toggle
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

  // Dark Mode Toggle Functionality
  toggleDarkMode.addEventListener('change', () => {
    if (toggleDarkMode.checked) {
      console.log("Dark mode activated");
      map.setOptions({
        styles: [
          {
            featureType: 'all',
            stylers: [
              { saturation: -100 }, // Desaturate all colors
              { lightness: -30 }, // Darken overall
            ],
          },
          {
            featureType: 'landscape',
            stylers: [{ color: '#181818' }], // Dark gray for land
          },
          {
            featureType: 'water',
            stylers: [{ color: '#000000' }], // Black for water
          },
          {
            featureType: 'road',
            stylers: [{ color: '#444444' }], // Dark gray for roads
          },
          {
            featureType: 'poi',
            stylers: [{ color: '#303030' }], // Dark gray for points of interest
          }
        ]
      });
    } else {
      console.log("Dark mode deactivated");
      map.setOptions({ styles: [] }); // Reset to default styles
    }
  });

}

window.initMap = initMap;
window.addEventListener('load', initMap);
