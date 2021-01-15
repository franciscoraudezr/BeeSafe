
//mapa
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
    guardarCoordenadas(longitud, latitud);

    map.setCenter({ lon: position.coords.longitude, lat: position.coords.latitude })//cambio

  }, function () { }, { timeout: 5000 });

} else {
  console.log('Error de longitud y latitud');
}

function guardarCoordenadas(plongitud, platitud) {
  console.log(plongitud);
  console.log(platitud);
  localStorage.setItem('longitud', plongitud);
  localStorage.setItem('latitud', platitud);
}

