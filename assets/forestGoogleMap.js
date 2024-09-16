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
  
  mapMarker.addListener("click", () => {
    map.setCenter(mapMarker.position);
    map.setZoom(8);
    infowindow.open({
      anchor: mapMarker, map
    });
    // myFunction();
  });
}
function myFunction(){

  var menu = document.getElementsByClassName("menu");

  if (menu[0].classList.contains("active")){fdsa
      menu[0].classList.remove("active");
  }else{
      menu[0].classList.add("active");

  }
}

function buildContent(property){
  const content = document.createElement("div");
  content.classList.add("property");
  
  content.innerHTML = `
    <div id = "icon">
     <img src="tree.gif" alt="https://www.flaticon.com/free-animated-icons/season"></img>
    </div>
    <ul class="menu">
      <li id="aboutMe">More about Me</li>
      <li id="feedMe">Feed Me</li>
      <li id="shareMe">Make me amous</li>
    </ul> 
  `;
}

window.initMap = initMap;

