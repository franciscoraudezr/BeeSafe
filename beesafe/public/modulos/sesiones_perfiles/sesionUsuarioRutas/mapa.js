var cont = 0;
mapboxgl.accessToken = 'pk.eyJ1IjoiYWJsYW5jb2NlbmZvIiwiYSI6ImNrODNud2lrdzB6NDQzZnBxZzh1cmZ6ZnEifQ.zM2OTXbSt4-hq2FzCB7WkQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 14.5,
});

//script para conocer la ubicación actual

var longitud;
var latitud;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var longitud = position.coords.longitude;
    var latitud = position.coords.latitude
    /* guardarCoordenadas(longitud, latitud); */

    map.setCenter({ lon: position.coords.longitude, lat: position.coords.latitude })//cambio

  }, function () { }, { timeout: 5000 });

} else {
  console.log('Error de longitud y latitud');
}

/* function guardarCoordenadas(plongitud, platitud) {
    console.log(plongitud);
    console.log(platitud);
    localStorage.setItem('longitud', plongitud);
    localStorage.setItem('latitud', platitud);
} */

async function getRutas() {
  var response = await fetch('/listarRutas/recibir');
  var data = await response.json();
  return data;
}

listaRutas();

async function listaRutas() {

  var rutas = await getRutas();

  for (var i = 0; i < rutas.length; i++) {

    var radius = [25, 25];
    var profile = "driving";

    var coords = await obtenerRuta(rutas[i].coordenada, radius, profile);

    map.addLayer({
      "id": rutas[i]._id,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": coords
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#03AA46",
        "line-width": 4,
        "line-opacity": 0.8
      }
    });
  }//fin del for

};//fin de la funcion

async function obtenerRuta(coordenada, radius, profile) {
  var radiuses = radius.join(';')
  var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordenada + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;
  var response = await fetch(query);
  var coord = await response.json();
  var coords = coord.matchings[0].geometry;
  console.log(coords.coordinates);
  return coords;
}











