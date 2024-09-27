let map;
let markers = [];
let overlay; // Variable to hold the overlay instance
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
    north: -11,  // Northern boundary (approximate for northern Australia)
    south: -44.0,  // Southern boundary (approximate for southern Australia)
    east: 154.0,   // Eastern boundary (approximate for eastern Australia)
    west: 112.8    // Western boundary (approximate for western Australia)
  };

  // Create the GroundOverlay but do not set it on the map yet
  overlay = new google.maps.GroundOverlay(
    aboriginalLandImageUrl, // Use the dynamically set image URL
    aboriginalLandBounds
  );

  setupToggles(); // Initialize toggles after the map is ready
}

function setupToggles() {
  const toggleMarkers = document.getElementById('toggleMarkers');
  const toggleOverlay = document.getElementById('toggleOverlay');

  if (!toggleMarkers || !toggleOverlay) {
    console.error('Toggle switches not found!');
    return;
  }

  // Create markers but initially don't display them
  markers = locations.map(location => {
    return new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      title: location.city,
      icon: {
        url: treeIconUrl, // Use the custom icon
        scaledSize: new google.maps.Size(fixedIconSize, fixedIconSize) // Fixed size for icons
      }
    });
  });

  // Handle markers visibility
  toggleMarkers.addEventListener('change', () => {
    const visible = toggleMarkers.checked;
    console.log('Markers toggle state:', visible);
    
    markers.forEach(marker => {
      marker.setMap(visible ? map : null); // Show or hide markers
    });
  });

  // Handle overlay visibility
  toggleOverlay.addEventListener('change', () => {
    const visible = toggleOverlay.checked;
    console.log('Overlay toggle state:', visible);
    
    overlay.setMap(visible ? map : null); // Show or hide overlay
  });
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
