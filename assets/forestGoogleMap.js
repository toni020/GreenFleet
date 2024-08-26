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
  const mapMarker = new AdvancedMarkerElement({
    map,
    position: { lat: -34.2923902, lng: 149.7934873 },
    gmpClickable: true,
  });
  
  // const mapMarker2 = new AdvancedMarkerElement({
  //   map,
  //   position: { lat: -35.095109193240894, lng: 148.9273121122105 },
  //   content: pin.element,

  // });
  //  const mapMarker3 = new AdvancedMarkerElement({
  //   map,
  //   position: { lat: -36.39263272647331, lng:  148.59409546808754 },
  //    content: pin.element,
  // });
  //  const mapMarker4 = new AdvancedMarkerElement({
  //   map,
  //   position: { lat: -26.591114609395387, lng: 151.74961726769178 },
  //   content: pin.element,
  // });
}

initMap();