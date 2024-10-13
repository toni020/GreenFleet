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

function buildContent(f){
  const WIDTH = 450;
  const content = document.createElement("div");
  content.classList.add("forest");
  content.innerHTML = `
    <img class="icon" src = "https://cdn.shopify.com/s/files/1/0888/9650/4126/files/tree.png?v=1726456389">
    <section class="container">
      <div class="slider-wrapper">
        <div class="slider">

        </div>
      </div>
    </section>
    <div class="menu">
      <div class="name">${f?.name}</div>
      <div class="address">${f?.address}</div>
      <div class="aboutMe");">More about me</div>
      <div class="feedMe" onclick="window.open('https://www.greenfleet.com.au/pages/donate');">Feed Me</div>
      <div class="shareMe">Make me famous</div>
      <div class="media1">
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
      aboutMe(f);
    });
    content.querySelector(".shareMe").addEventListener("click", () =>{
      shareMe();
    });
    imageSlider(f, content);
    return content;
}
function shareMe(){
  const media1=document.getElementsByClassName("media1");
    for(let i=0; i<media1.length; i++){
      if (media1[i].style.display =="none") {
        media1[i].style.display ="block";
      }else{
        media1[i].style.display ="none";
      }
    }
}
function aboutMe(forest){
  if (forest?.link === "") {
    alert("Sorry, the forest isn't available now.")
  }else{
    window.open(forest?.link, "_blank");
  }
}

function imageSlider(forest, content){
  var container = content.querySelector(".slider");
  var docFrag = document.createDocumentFragment();

  if (forest?.images="") {
    alert("Sorry, the forest isn't available now.")
  } else if (forest?.image){
    forest.images.forEach(function(url) {
      var img = document.createElement('img');
      img.src = url;
      docFrag.appendChild(img);
    });
  }

  container.appendChild(docFrag);
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
    images: [
        "https://cdn.shopify.com/s/files/1/0888/9650/4126/files/fall-vegetable-box.jpg?v=1724300459",
        "https://cdn.shopify.com/s/files/1/0888/9650/4126/files/rack-of-womens-clothing.jpg?v=1724299789",
    ],
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

