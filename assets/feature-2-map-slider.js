let map;
let markers = [];
const locations = [
  { lat: -34.2923902, lng: 149.7934873 },
  { lat: -35.282, lng: 149.128 },
  { lat: -33.8688, lng: 151.2093 },
  { lat: -37.8136, lng: 144.9631 },
  { lat: -27.4698, lng: 153.0251 },
];

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
  });

  // Create markers but keep them hidden initially
  markers = locations.map(location => {
    return new AdvancedMarkerElement({
      map: map,
      position: location,
      gmpClickable: true,
      visible: false // Initially hide all markers
    });
  });

  setupToggle(); // Call setupToggle here to initialize after map is loaded
}

function setupToggle() {
  const toggle = document.getElementById('toggleMarkers');
  toggle.addEventListener('change', () => {
    const visible = toggle.checked;
    console.log('Toggle state:', visible); // Debugging line
    markers.forEach((marker, index) => {
      marker.setVisible(visible);
      console.log(`Marker ${index} visibility: ${visible}`); // Debugging line
    });
  });
}

window.initMap = initMap;
window.addEventListener('load', () => {
  initMap(); // Ensure initMap is called on load
});
