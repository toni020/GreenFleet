let map;
let markers = [];
const locations = [
  { lat: -34.2923902, lng: 149.7934873, city: 'Canberra' },
  { lat: -35.282, lng: 149.128, city: 'Canberra' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  { lat: -27.4698, lng: 153.0251, city: 'Brisbane' },
];

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 }; // Central Australia
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
  });

  // Create markers and keep them hidden initially
  markers = locations.map(location => {
    return new AdvancedMarkerElement({
      map: map,
      position: { lat: location.lat, lng: location.lng },
      gmpClickable: true,
      visible: false // Initially hide all markers
    });
  });

  setupToggle(); // Initialize the toggle after the map and markers are ready
}

function setupToggle() {
  const toggle = document.getElementById('toggleMarkers');
  
  if (!toggle) {
    console.error('Toggle switch not found!');
    return;
  }

  toggle.addEventListener('change', () => {
    const visible = toggle.checked;
    console.log('Toggle state:', visible); // Debugging line
    
    markers.forEach((marker, index) => {
      marker.setVisible(visible);
      console.log(`Marker ${index} (${locations[index].city}) visibility set to: ${visible}`); // Debugging line
    });
  });
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
