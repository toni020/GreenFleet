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

// Fixed icon size
const fixedIconSize = 40;

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 }; // Central Australia
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
  });

  setupToggle(); // Initialize the toggle after the map is ready
}

function setupToggle() {
  const toggle = document.getElementById('toggleMarkers');
  const toggleLabel = document.querySelector('.toggle-label');
  const overlay = document.querySelector('.overlay');

  if (!toggle || !toggleLabel || !overlay) {
    console.error('Toggle switch, label, or overlay not found!');
    return;
  }

  // Update the toggle label text and manage overlay state based on the toggle state
  function updateToggleState() {
    if (toggle.checked) {
      toggleLabel.textContent = 'Hide Forests'; // Text when checked (Show markers)
      overlay.classList.remove('active'); // Hide the overlay
      showMarkers(); // Show the markers on the map
    } else {
      toggleLabel.textContent = 'Show Forests'; // Text when unchecked (Hide markers)
      overlay.classList.add('active'); // Show the overlay
      clearMarkers(); // Hide the markers from the map
    }
  }

  // Initialize the label text and the overlay state
  updateToggleState();

  // Add an event listener to update the state when the toggle is changed
  toggle.addEventListener('change', updateToggleState);
}

// Function to show markers
function showMarkers() {
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

// Function to clear all markers from the map
function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
