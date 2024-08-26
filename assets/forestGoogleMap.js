let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -37.72019620201051, lng: 145.04690113680994 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

}

initMap();