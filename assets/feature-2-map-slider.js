let map;
let markers = [];
let overlay; // Define overlay variable in global scope
const locations = [
  { lat: -34.2923902, lng: 149.7934873, city: 'Canberra' },
  { lat: -35.282, lng: 149.128, city: 'Canberra' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  { lat: -27.4698, lng: 153.0251, city: 'Brisbane' },
  { lat: -31.9505, lng: 115.8605, city: 'Perth' },
  { lat: -12.4634, lng: 130.8456, city: 'Darwin' }
];

const treeIconUrl = 'https://cdn-icons-png.flaticon.com/512/489/489969.png';
const fixedIconSize = 40;

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 }; // Central Australia
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
  });

  // Define the bounds for the aboriginal land overlay
  const aboriginalLandBounds = {
    north: -11,
    south: -44.0,
    east: 154.0,
    west: 112.8,
  };

  // Create the GroundOverlay
  overlay = new google.maps.GroundOverlay(
    aboriginalLandImageUrl, // Use the dynamically set image URL
    aboriginalLandBounds
  );

  setupToggle(); // Initialize the toggles after the map is ready
}

function setupToggle() {
  const toggleForest = document.getElementById('toggleMarkers');
  const toggleAboriginal = document.getElementById('toggleAboriginalOverlay');
  const toggleLabelForest = document.querySelector('.toggle-label:nth-of-type(1)');
  const toggleLabelAboriginal = document.querySelector('.toggle-label:nth-of-type(2)');
  const sourceText = document.querySelector('.source-text'); // Select the source text element

  // Initialize label text for forests
  toggleLabelForest.textContent = toggleForest.checked ? 'Hide Greenfleet Impact' : 'Show Greenfleet Impact';

  // Forest toggle functionality
  toggleForest.addEventListener('change', () => {
    // Update forest toggle label text
    toggleLabelForest.textContent = toggleForest.checked ? 'Hide Greenfleet Impact' : 'Show Greenfleet Impact';

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (toggleForest.checked) {
      // Recreate and add markers for forests
      markers = locations.map(location => {
        return new google.maps.Marker({
          map: map,
          position: { lat: location.lat, lng: location.lng },
          title: location.city,
          icon: {
            url: treeIconUrl,
            scaledSize: new google.maps.Size(fixedIconSize, fixedIconSize)
          }
        });
      });
    }
  });

  toggleAboriginal.addEventListener('change', () => {
    if (toggleAboriginal.checked) {
      overlay.setMap(map); // Show the overlay
      toggleLabelAboriginal.textContent = 'Hide Indigenous Forest Estate';
      sourceText.style.display = 'block'; // Show the source text
    } else {
      overlay.setMap(null); // Hide the overlay
      toggleLabelAboriginal.textContent = 'Show Indigenous Forest Estate';
      sourceText.style.display = 'none'; // Hide the source text
    }
  });


}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
