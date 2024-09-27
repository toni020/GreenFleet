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

  });

  for (var forest of forests) {
    const mapMarker = new google.maps.marker.AdvancedMarkerElement({
    map,
    content: buildContent(forest),
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

function demo(forest){
  if (forest?.link === "") {
    alert("Sorry, the forest isn't available now.")
  }else{
    window.open(forest?.link, "_blank");
  }
}

function buildContent(f){

  const content = document.createElement("div");
  content.classList.add("forest");
  content.innerHTML = `
    <img class="icon" src = "https://cdn.shopify.com/s/files/1/0888/9650/4126/files/tree.png?v=1726456389">
    <div class="menu">
      <div class="name">${f?.name}</div>
      <div class="address">${f?.address}</div>
      <div class="aboutMe");">More about me</div>
      <div class="feedMe" onclick="window.open('https://www.greenfleet.com.au/pages/donate');">Feed Me</div>
      <div class="shareMe">Make me famous</div>
      <div id="media1">
          <li class="facebook">
            <img src="https://cdn.shopify.com/s/files/1/0888/9650/4126/files/facebook.png?v=1727331048">
            <p>Connect to Facebook</p>
          </li>
          <li class="instagram">
            <img src="https://cdn.shopify.com/s/files/1/0888/9650/4126/files/instagram.png?v=1727359025">
            <p>Connect to Instagram</p></li>
          <li class="linkedin">
            <img src="https://cdn.shopify.com/s/files/1/0888/9650/4126/files/linkedin.png?v=1727359078">
            <p>Connect to linkedin</p></li>
      </div>
    </div> `;
    content.querySelector(".aboutMe").addEventListener("click", () => {
      demo(f);
    });
    content.querySelector(".shareMe").addEventListener("click", () =>{
      document.getElementById("media1").style.display = "flex";
    };
    return content;
}


const forests = [
  {
    name: "River Bend",
    address: "Esdale Road, Mullion, NSW 2582",
    position: {
      lat: -35.0953155,
      lng: 148.9246943,
    },
    link:"",
    facebook: "https://www.facebook.com/GreenfleetAustralia/",
    instagram: "https://www.instagram.com/greenfleetaustralia/",
    Linkedin: "https://www.linkedin.com/company/greenfleet",
  },
  {
    name: "Back O'Slaters",
    address: "5798 Taralga Rd, Curraweela, NSW 2580",
    position: {
      lat: -34.2899561,
      lng: 149.7985828,
    },
    link: "https://www.greenfleet.com.au/blogs/forest/back-oslaters",
    
  },
  {
    name: "Kosciuszko National Park",
    address: "Kosciuszko Road, Jindabyne, NSW 2627",
    position: {
      lat: -36.392758,
      lng: 148.5915313,
    },
    link: "https://www.greenfleet.com.au/blogs/forest/kosciuszko-national-park",
  },
];

window.initMap = initMap;

