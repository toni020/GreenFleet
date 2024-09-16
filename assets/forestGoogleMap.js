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
  const priceTag = document.createElement("div");

  priceTag.className = "price-tag";
  priceTag.textContent = "$2.5M";
  priceTag.src="{{'tree.gif' | image_url}}";
    
  const mapMarker = new AdvancedMarkerElement({
    map,
    position: { lat: -34.2923902, lng: 149.7934873 },
    content:priceTag,
    gmpClickable: true,
  });
  
  mapMarker.addListener("click", () => {
    map.setCenter(mapMarker.position);
    map.setZoom(8);
    // infowindow.open({
    //   anchor: mapMarker, map
    // });
    // myFunction(mapMarker);
  });
}
function myFunction(markerView){
  if (markerView.content.classList.contains("active")){
      markerView.content.classList.remove("active");
  }else{
      markerView.content.classList.add("active");

  }
}

function buildContent(){
  const content = document.createElement("div");
  // content.classList.add("menu");
  content.src="{{'tree.gif' | image_url}}";
//   content.innerHTML = `
//     <ul class="menu">
//       <li id="aboutMe">More about Me</li>
//       <li id="feedMe">Feed Me</li>
//       <li id="shareMe">Make me amous</li>
//     </ul> `;
// }

window.initMap = initMap;

