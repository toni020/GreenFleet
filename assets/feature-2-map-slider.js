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

const fixedIconSize = 40; // Adjusted icon size

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
  toggleLabelForest.textContent = toggleForest.checked ? 'After Greenfleet Impact' : 'Before Greenfleet Impact';

  // Forest toggle functionality
  toggleForest.addEventListener('change', () => {
    // Update forest toggle label text
    toggleLabelForest.textContent = toggleForest.checked ? 'After Greenfleet Impact' : 'Before Greenfleet Impact';

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (toggleForest.checked) {
      // Recreate and add markers for forests with a vertical grow-up animation
      markers = locations.map(location => {
        const marker = new google.maps.Marker({
          map: map,
          position: { lat: location.lat, lng: location.lng },
          title: location.city,
          icon: {
            url: treeIconUrl,
            scaledSize: new google.maps.Size(fixedIconSize, 0) // Start with height 0 and fixed width
          }
        });

        // Create the vertical grow-up animation
        let height = 1; // Initial height
        const maxHeight = fixedIconSize;
        const growSpeed = 2; // Speed of growth (pixels per step)

        function grow() {
          if (height < maxHeight) {
            height += growSpeed;
            marker.setIcon({
              url: treeIconUrl,
              scaledSize: new google.maps.Size(fixedIconSize, height)
            });
            setTimeout(grow, 30); // Continue growing
          } else {
            // Set final size to ensure it's accurate
            marker.setIcon({
              url: treeIconUrl,
              scaledSize: new google.maps.Size(fixedIconSize, maxHeight)
            });
          }
        }
        
        // Start the grow animation
        grow();

        return marker;
      });
    }
  });

  toggleAboriginal.addEventListener('change', () => {
    sourceText.textContent = toggleAboriginal.checked ? 'Source: Adapted from "Australia\'s Indigenous land and forest estate" by National Forest Inventory 2020.' : '';

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
