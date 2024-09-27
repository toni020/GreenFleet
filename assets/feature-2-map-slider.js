let map;
let markers = [];
let overlay; // Declare overlay variable
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

  // Define the bounds for the Aboriginal land overlay
  const aboriginalLandBounds = {
    north: -11,  // Northern boundary (approximate for northern Australia)
    south: -44.0,  // Southern boundary (approximate for southern Australia)
    east: 154.0,   // Eastern boundary (approximate for eastern Australia)
    west: 112.8    // Western boundary (approximate for western Australia)
  };

  // Create and set the GroundOverlay
  overlay = new google.maps.GroundOverlay(
    aboriginalLandImageUrl, // Use the dynamically set image URL
    aboriginalLandBounds
  );

  // Do not set the overlay on the map yet
  // overlay.setMap(map); 

  setupToggle(); // Initialize the toggle after the map is ready
}

function setupToggle() {
  const toggleMarkers = document.getElementById('toggleMarkers');
  const toggleAboriginalOverlay = document.getElementById('toggleAboriginalOverlay');
  const toggleLabelMarkers = document.querySelector('.toggle-label:nth-of-type(1)');
  const toggleLabelAboriginal = document.querySelector('.toggle-label:nth-of-type(2)');

  if (!toggleMarkers || !toggleAboriginalOverlay || !toggleLabelMarkers || !toggleLabelAboriginal) {
    console.error('Toggle switch or label not found!');
    return;
  }

  // Update the toggle label text based on the toggle state
  function updateToggleLabelMarkers() {
    toggleLabelMarkers.textContent = toggleMarkers.checked ? 'Hide Forests' : 'Show Forests';
  }

  function updateToggleLabelAboriginal() {
    toggleLabelAboriginal.textContent = toggleAboriginalOverlay.checked ? 'Hide Aboriginal Overlay' : 'Show Aboriginal Overlay';
    overlay.setMap(toggleAboriginalOverlay.checked ? map : null); // Show or hide overlay
  }

  // Initialize label text
  updateToggleLabelMarkers();
  updateToggleLabelAboriginal();

  // Update label text when toggle state changes
  toggleMarkers.addEventListener('change', () => {
    updateToggleLabelMarkers();
    const visible = toggleMarkers.checked;
    console.log('Toggle state (Forests):', visible); // Debugging line

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (visible) {
      // Recreate and add markers with fixed icon size
      markers = locations.map(location => {
        return new google.maps.Marker({
          map: map,
          position: { lat: location.lat, lng: location.lng },
          title: location.city,
          icon: {
            url: treeIconUrl, // Use the custom icon
            scaledSize: new google.maps.Size(fixedIconSize, fixedIconSize) // Fixed size for icons
          }
        });
      });
    }
  });

  // Handle Aboriginal overlay visibility
  toggleAboriginalOverlay.addEventListener('change', updateToggleLabelAboriginal);
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
