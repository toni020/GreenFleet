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
    content:buildContent(),
    gmpClickable: true,
  });

  for (const forest of forests) {
    const mapMarker = new google.maps.marker.AdvancedMarkerElement({
    map,
    content:buildContent(forest),
    position: forest.position,
    });
      
    mapMarker.addListener("click", () => {
      map.setCenter(mapMarker.position);
      map.setZoom(8);
      myFunction(mapMarker);
    });
  }

}
function myFunction(markerView){
  if (!markerView.content.classList.contains("active")){
      markerView.content.classList.add("active");
  }
  // else{
  //     markerView.content.classList.remove("active");
  //     }
  google.maps.event.addListener(map, "click", function(event) {
    markerView.content.classList.remove("active");
});
}

function buildContent(forests){

  const content = document.createElement("div");
  content.classList.add('forest');
  content.innerHTML = `
    <img class="icon" src = "https://cdn.shopify.com/s/files/1/0888/9650/4126/files/tree.png?v=1726456389">
    <div class="menu">
      <div class="name">Forest Name</div>
      // <div class="address">${forests.address}</div>
      <div class="aboutMe">More about Me</div>
      <div class="feedMe">Feed Me</div>
      <div class="shareMe">Make me famous</div>
    </div> `;
    return content;
}
const forests = [
  {
    address: "Esdale Road, Mullion, NSW 2582",
    position: {
      lat: -35.0953155,
      lng: 148.9246943,
    },
  },
  {
    address: "5798 Taralga Rd, Curraweela, NSW 2580",
    position: {
      lat: -34.2899561,
      lng: 149.7985828,
    },
    link:"https://www.greenfleet.com.au/blogs/forest/back-oslaters",
  },
  {
    address: "Kosciuszko Road, Jindabyne, NSW 2627",
    position: {
      lat: -36.392758,
      lng: 148.5915313,
    },
  },
]
window.initMap = initMap;

