let map;
let markers = [];
let grassMarkers = []; // New array to hold grass markers
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
const minGrassSize = Math.round(fixedIconSize * (1 / 3)); // Minimum grass height
const maxGrassSize = Math.round(fixedIconSize * (3 / 5)); // Maximum grass height
const grassSpacing = 0.0003; // Minimum distance to keep between grasses and trees

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

function getRandomPosition(lat, lng) {
  const latOffset = (Math.random() * grassSpacing) - (grassSpacing / 2);
  const lngOffset = (Math.random() * grassSpacing) - (grassSpacing / 2);
  return { lat: lat + latOffset, lng: lng + lngOffset };
}

function checkOverlap(position, radius) {
  // Check against tree markers
  for (const marker of markers) {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng()),
      new google.maps.LatLng(position.lat, position.lng)
    );
    if (distance < radius) {
      return true; // Overlap detected
    }
  }

  // Check against grass markers
  for (const grassMarker of grassMarkers) {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(grassMarker.getPosition().lat(), grassMarker.getPosition().lng()),
      new google.maps.LatLng(position.lat, position.lng)
    );
    if (distance < radius) {
      return true; // Overlap detected
    }
  }

  return false; // No overlap
}

function addGrassNearTree(treeMarker) {
  const grassCount = Math.floor(Math.random() * (3 - 2 + 1)) + 2; // Random count between 2 and 3
  for (let i = 0; i < grassCount; i++) {
    const treePos = treeMarker.getPosition();
    let grassPos;
    let grassRadius = Math.round(fixedIconSize / 2);

    // Ensure grass position does not overlap
    do {
      grassPos = getRandomPosition(treePos.lat(), treePos.lng());
    } while (checkOverlap(grassPos, grassRadius));

    const grassMarker = new google.maps.Marker({
      map: map,
      position: grassPos,
      icon: {
        url: grassIconUrl,
        scaledSize: new google.maps.Size(Math.floor(Math.random() * (maxGrassSize - minGrassSize + 1)) + minGrassSize, Math.floor(Math.random() * (maxGrassSize - minGrassSize + 1)) + minGrassSize) // Random size for grass
      }
    });

    grassMarkers.push(grassMarker); // Store grass marker
  }
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
      // Recreate and add markers for forests with a grow-up animation
      markers = locations.map(location => {
        const marker = new google.maps.Marker({
          map: map,
          position: { lat: location.lat, lng: location.lng },
          title: location.city,
          icon: {
            url: treeIconUrl,
            scaledSize: new google.maps.Size(0, 0) // Start with size 0
          }
        });

        // Create the grow-up animation
        let size = 1; // Initial size
        const maxSize = fixedIconSize;
        const growSpeed = 2; // Speed of growth (pixels per step)

        function grow() {
          if (size < maxSize) {
            size += growSpeed;
            marker.setIcon({
              url: treeIconUrl,
              scaledSize: new google.maps.Size(size, size)
            });
            setTimeout(grow, 30); // Continue growing
          } else {
            // Set final size to ensure it's accurate
            marker.setIcon({
              url: treeIconUrl,
              scaledSize: new google.maps.Size(maxSize, maxSize)
            });
            // Add grasses near the tree after it has fully grown
            addGrassNearTree(marker);
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

      // Set initial opacity
      overlay.setOpacity(0);

      // Gradually increase opacity
      let opacity = 0;
      const fadeInSpeed = 0.05; // Adjust the speed of the fade-in effect

      function fadeIn() {
        if (opacity < 1) {
          opacity += fadeInSpeed;
          overlay.setOpacity(opacity);
          setTimeout(fadeIn, 50); // Continue fading in
        } else {
          overlay.setOpacity(1); // Ensure it's fully opaque at the end
        }
      }

      fadeIn(); // Start the fade-in effect

    } else {
      // Gradually decrease opacity to fade out
      let opacity = overlay.getOpacity();
      const fadeOutSpeed = 0.05; // Adjust the speed of the fade-out effect

      function fadeOut() {
        if (opacity > 0) {
          opacity -= fadeOutSpeed;
          overlay.setOpacity(opacity);
          setTimeout(fadeOut, 50); // Continue fading out
        } else {
          overlay.setMap(null); // Remove the overlay when fully faded out
        }
      }

      fadeOut(); // Start the fade-out effect
    }
  });
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
