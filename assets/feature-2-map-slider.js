let mapBefore, mapAfter;

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  mapBefore = new Map(document.getElementById("map-before"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  mapAfter = new Map(document.getElementById("map-after"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const mapMarker = new AdvancedMarkerElement({
    map: mapAfter,
    position: { lat: -34.2923902, lng: 149.7934873 },
    gmpClickable: true,
  });
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
      slider.style.left = `${percentage}%`;
      document.getElementById('map-before').style.width = `${percentage}%`;
      document.getElementById('map-after').style.width = `${100 - percentage}%`;
    }
  }
}

window.initMap = initMap;
window.addEventListener('load', () => {
  setupSlider();
});
