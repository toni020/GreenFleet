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

  setupSlider(); // Call setupSlider here to initialize after map is loaded
}

function setupSlider() {
  const slider = document.querySelector('.slider');
  const container = document.getElementById('map-container');
  let isDragging = false;

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
    });
  });

  function onMouseMove(e) {
    if (isDragging) {
      const containerRect = container.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const percentage = (x / containerRect.width) * 100;

      // Show markers based on the slider's position
      markers.forEach((marker, index) => {
        marker.setVisible(index < Math.round((percentage / 100) * markers.length));
      });

      slider.style.left = `${percentage}%`;
    }
  }
}

window.initMap = initMap;
window.addEventListener('load', () => {
  setupSlider(); // Ensure setupSlider is called on load
});
