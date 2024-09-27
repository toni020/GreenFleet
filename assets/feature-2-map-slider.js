let overlay; // Define overlay variable in global scope

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
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
  const toggleLabelForest = document.querySelector('.toggle-label');

  if (!toggleForest || !toggleLabelForest) {
    console.error('Forest toggle switch or label not found!');
    return;
  }

  // Update the forest toggle label text based on the toggle state
  function updateForestToggleLabel() {
    toggleLabelForest.textContent = toggleForest.checked ? 'Hide Forests' : 'Show Forests';
  }

  // Initialize label text
  updateForestToggleLabel();

  // Update label text when forest toggle state changes
  toggleForest.addEventListener('change', () => {
    updateForestToggleLabel();

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

  // Handle Aboriginal overlay visibility
  toggleAboriginal.addEventListener('change', () => {
    if (toggleAboriginal.checked) {
      overlay.setMap(map); // Show the overlay
    } else {
      overlay.setMap(null); // Hide the overlay
    }
  });
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
