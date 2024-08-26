let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -37.72019620201051, lng: 145.04690113680994 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 3.8,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  const mapMarker = new AdvancedMarkerElement({
    map,
    position: { lat: -34.2923902, lng: 149.7934873 },
  });

}

initMap();