let map;
let markers = [];
const locations = [
  { lat: -34.2923902, lng: 149.7934873, city: 'Canberra' },
  { lat: -35.282, lng: 149.128, city: 'Canberra' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  { lat: -27.4698, lng: 153.0251, city: 'Brisbane' },
  { lat: -31.9505, lng: 115.8605, city: 'Perth' },
  { lat: -12.4634, lng: 130.8456, city: 'Darwin' }
];

// Replace with the URL of your tree icon
const treeIconUrl = 'https://cdn-icons-png.flaticon.com/512/489/489969.png';

// Base icon size
const baseIconSize = 32;

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 }; // Central Australia
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
  });

  map.addListener('zoom_changed', updateMarkerIcons); // Update icons on zoom change

  setupToggle(); // Initialize the toggle after the map is ready
}

function calculateIconSize() {
  const zoomLevel = map.getZoom();
  // Adjust icon size based on zoom level
  // Ensure minimum size for visibility
  const size = Math.max(20, baseIconSize * (zoomLevel / 10));
  return new google.maps.Size(size, size);
}

function updateMarkerIcons() {
  const iconSize = calculateIconSize();
  markers.forEach(marker => {
    marker.setIcon({
      url: treeIconUrl, // Use the custom icon
      scaledSize: iconSize // Scale the icon to the desired size
    });
  });
}

function setupToggle() {
  const toggle = document.getElementById('toggleMarkers');
  const toggleLabel = document.querySelector('.toggle-label');

  if (!toggle || !toggleLabel) {
    console.error('Toggle switch or label not found!');
    return;
  }

  // Update the toggle label text based on the toggle state
  function updateToggleLabel() {
 
