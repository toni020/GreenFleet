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
      // map.setCenter(mapMarker.position);
      // map.setZoom(8);
      myFunction(mapMarker);
    });
  }


}
function myFunction(markerView){
  if (!markerView.content.classList.contains("active")){
      markerView.content.classList.remove("active");
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
  const moreLink = f?.link ? f.link : "#"; 
  const isLinkAvailable = f?.link !== "";
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
      <div class="name">
        <p>${f?.name}</p>
      </div>
      <div class="drop-up">
        <div class="address">${f?.address}</div>
        <div class="aboutMe">
          <p>${f?.intro}
            <a class="more" href="${moreLink}" target="_blank">${isLinkAvailable ? 'More' : 'Not Available'}</a>
          </p></div>
        <div class="bottom">
          <div class="feedMe" onclick="window.open('https://www.greenfleet.com.au/pages/donate');">
            <p>Feed Me</p>
          </div>
            <div class="socailMedia">
              <li class="facebook">
                <img src="https://cdn.shopify.com/s/files/1/0888/9650/4126/files/facebook.png?v=1727331048">
              </li>
              <li class="instagram">
                <img src="https://cdn.shopify.com/s/files/1/0888/9650/4126/files/instagram.png?v=1727359025">
              <li class="linkedin">
                <img src="https://cdn.shopify.com/s/files/1/0888/9650/4126/files/linkedin.png?v=1727359078">
            </div>

        </div>
      </div>
      
    </div> `;
    // content.querySelector(".shareMe").addEventListener("click", () =>{
    //   shareMe();
    // });

  
    imageSlider(f, content);
    return content;
}

function shareMe(){
  const socailMedia=document.getElementsByClassName("socailMedia");
    for(let i=0; i<socailMedia.length; i++){
      if (socailMedia[i].style.display =="none") {
        socailMedia[i].style.display ="block";
      }else{
        socailMedia[i].style.display ="none";
      }
    }
}
// function aboutMe(forest){
//   if (forest?.link === "") {
//     alert("Sorry, the forest isn't available now.");
//   }else{
//     window.open(forest?.link, "_blank");
//   }
// }

function imageSlider(forest, content){
  var container = content.querySelector(".slider");
  var docFrag = document.createDocumentFragment();

  
  if (forest?.images) {
    forest.images.forEach(function(url) {
      var img = document.createElement('img');
      img.src = url;
      docFrag.appendChild(img);
    });
  }

  container.appendChild(docFrag);
  initializeSlider(container);
}

function initializeSlider(container) {
  let slideIndex = 0;
  const slides = container.querySelectorAll(".slider img"); // Access slider images within the container

  if (!slides || slides.length === 0) {
    // Handle case when no slides (images) are found
    console.log("No images found in the slider");
    return; // Exit the function if no slides are present
  }

  function showSlide(index) {
    if (index >= slides.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = slides.length - 1;
    }

    slides.forEach((slide) => {
      slide.style.display = "none"; // Hide all slides
    });

    slides[slideIndex].style.display = "block"; // Show current slide
  }

  // Initialize first slide
  showSlide(slideIndex);

  // Automatically switch slides every 5 seconds
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 5000);
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
    intro:"",
  },
  {
    name: "Back O'Slaters",
    address: "5798 Taralga Rd, Curraweela, NSW 2580",
    position: {
      lat: -34.2899561,
      lng: 149.7985828,
    },
    link: "https://www.greenfleet.com.au/blogs/forest/back-oslaters",
    images:[],
    intro:"",
  },
  {
    name: "Kosciuszko National Park",
    address: "Kosciuszko Road, Jindabyne, NSW 2627",
    position: {
      lat: -36.392758,
      lng: 148.5915313,
    },
    link: "https://www.greenfleet.com.au/blogs/forest/kosciuszko-national-park",
    images:["https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/kosciuszko-national-park/khancoban-area/park/horse-riding-geehi.jpg",
            "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/kosciuszko-national-park/park/winter-perisher-resort.jpg",
           "https://www.caravanrvcamping.com.au/assets/webshop/cms/82/782-1.jpg?1598483204",],
    intro:"Greenfleet has been working with the NSW National Parks and Wildlife Service (NPWS) since 2008 to revegetate a number of sites within Kosciuszko National Park. Five separate sites are undergoing a Greenfleet transformation, with a total area of approximately 442.5 hectares.<br> Primarily used for grazing prior to being incorporated into Kosciuszko National Park in1967, natural regeneration at these sites has been slow and sporadic because of weed infestation, kangaroo and pest animal populations, and compacted soils.",
  },
];

window.initMap = initMap;

