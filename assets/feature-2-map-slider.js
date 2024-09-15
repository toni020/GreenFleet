let map;
let marker;
const markerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Default red marker
const markerIconActive = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; // Green marker

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 }; // Central Australia
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
  });

  // Initialize marker
  marker = new google.maps.Marker({
    position: { lat: -34.2923902, lng: 149.7934873 }, // Example position
    map: map,
    icon: markerIcon,
    title: 'Click me!',
    zIndex: 1 // Ensure marker is on top
  });

  // Add click event listener
  marker.addListener('click', () => {
    marker.setIcon(markerIconActive); // Change marker to green
  });

  setupToggle(); // Initialize the toggle after the map is ready
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
    
    // Toggle marker visibility
    if (visible) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
