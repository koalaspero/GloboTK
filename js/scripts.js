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

    earth.setView([-1.6, -78], 4);
}


