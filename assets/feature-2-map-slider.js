let map;
let markers = [];
let markerData = [
  { lat: -34.2923902, lng: 149.7934873 },
  { lat: -33.8688, lng: 151.2093 }, // Add more marker data as needed
];

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  markers = markerData.map((data) => {
    return new AdvancedMarkerElement({
      map,
      position: data,
      gmpClickable: true,
      visible: false // Initially hide all markers
    });
  });

  setupSlider();
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

      // Show markers based on slider position
      markers.forEach((marker, index) => {
        marker.setVisible(index < (percentage / 100) * markers.length);
      });

      slider.style.left = `${percentage}%`;
    }
  }
}

window.initMap = initMap;
