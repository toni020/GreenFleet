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

  setupButtons(); // Initialize buttons after the map is ready
}

function setupButtons() {
  const showMarkersButton = document.getElementById('showMarkers');
  const hideMarkersButton = document.getElementById('hideMarkers');
  const showOverlayButton = document.getElementById('showOverlay');
  const hideOverlayButton = document.getElementById('hideOverlay');

  if (!showMarkersButton || !hideMarkersButton || !showOverlayButton || !hideOverlayButton) {
    console.error('One or more buttons not found!');
    return;
  }

  // Show markers button click event
  showMarkersButton.addEventListener('click', () => {
    markers.forEach(marker => marker.setMap(map)); // Show all markers
  });

  // Hide markers button click event
  hideMarkersButton.addEventListener('click', () => {
    markers.forEach(marker => marker.setMap(null)); // Hide all markers
  });

  // Show overlay button click event
  showOverlayButton.addEventListener('click', () => {
    overlay.setMap(map); // Show overlay
  });

  // Hide overlay button click event
  hideOverlayButton.addEventListener('click', () => {
    overlay.setMap(null); // Hide overlay
  });

  // Initially create markers but don't display them until the user clicks the show button
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
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
