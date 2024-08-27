let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  
  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
  
  const menuContent = '<div>Item 1</div> + <div>Item 2</div>';
  const infowindow = new google.maps.InfoWindow({
    content: menuContent,
  });
  
  
  const mapMarker = new AdvancedMarkerElement({
    map,
    position: { lat: -34.2923902, lng: 149.7934873 },
    gmpClickable: true,
  });
  
  mapMarker.addListener("click", () => {
    // map.setCenter(mapMarker.position);
    // map.setZoom(8);
    infowindow.open({
      anchor: mapMarker, map
    });
  });

}

initMap();

