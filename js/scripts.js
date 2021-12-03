/*!
* Start Bootstrap - Clean Blog v6.0.7 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

function initialize() {
    var earth = new WE.map('earth_div');
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    fetch("data/countries.json")
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < Object.keys(data).length ; i++){
            let htmLine = "<b>"+ data[i]['name'] + "</b><br>Artistas más escuchados<br><a href='https://spotifycharts.com/regional/"+ data[i]['country'].toLowerCase()+"/daily/latest'>click here</a>";
            let latitude = data[i]['latitude'];
            let longitude = data[i]['longitude'];
            var marker = WE.marker([latitude, longitude]).addTo(earth);
            marker.bindPopup(htmLine, {maxWidth: 120, closeButton: true});
        }
    })
    .catch(console.error);

    var markerCustom = WE.marker([50, -9], '/img/logo-webglearth-white-100.png', 100, 24).addTo(earth);

    earth.setView([-1.6, -78], 3.5);
}


const peticion = () => {
   let proxy = 'https://damp-beach-17296.herokuapp.com/'
   //RSS de música latina de Billboard
   let url = 'https://rss.app/feeds/yUvE3qNwUCZ9GG1E.xml'

   fetch(proxy+url)
   .then(response => response.text())
   .then(data =>{
     const parser = new DOMParser();
     const xml = parser.parseFromString(data, "application/xml");
     var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

     let items =xml.getElementsByTagName('item');
     console.log(items[1].getElementsByTagName("description"))

     for(let i=1 ; i < 11 ; i++){
       let plantilla = `
        <div class="card mb-3" >
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="" class="img-fluid img-thumbnail" alt="news_img">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h3 class="card-title">Card title</h3>
                      <a href=""><p class ="card-text">More Info</p></a>
                      <p class="card-text"><small class="text-muted">Updated: {fecha}</small></p>
                    </div>
                  </div>
                </div>
              </div>
        `

      let title = items[i].getElementsByTagName('title')[0]
      let imag = items[i].getElementsByTagName('enclosure')[0]
	    let date = new Date(items[i].getElementsByTagName('pubDate')[0].textContent)
      let enlace = items[i].getElementsByTagName("link")[0]
      plantilla = plantilla.replace('Card title', title.innerHTML).replace('<![CDATA[',"").replace(']]>','');
      plantilla = plantilla.replace('src=""', 'src="'+imag.getAttribute("url")+'"');
	    plantilla = plantilla.replace('{fecha}', date.toLocaleString('esp',opciones))
      plantilla = plantilla.replace('a href="','a href="'+enlace.innerHTML+'"');

      document.getElementsByClassName('noticias container')[0].innerHTML += plantilla
     }

     console.log(xml);
   })


   .catch(console.error)
 }

function initMap() {
	var map = L.map('map').setView([-2.1449, -79.9676], 15);

	var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

	L.marker([-2.1449, -79.9676]).addTo(map)
		.bindPopup('FIEC ESPOL')
		.openPopup();
		
	L.control.locate().addTo(map);
}

 
