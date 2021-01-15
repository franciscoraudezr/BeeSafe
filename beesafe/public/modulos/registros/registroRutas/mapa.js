
var cont = 0;
mapboxgl.accessToken = 'pk.eyJ1IjoiYWJsYW5jb2NlbmZvIiwiYSI6ImNrODNud2lrdzB6NDQzZnBxZzh1cmZ6ZnEifQ.zM2OTXbSt4-hq2FzCB7WkQ';
var map = new mapboxgl.Map({
  container: 'map', // Especifico el ID del contenedor
  style: 'mapbox://styles/mapbox/streets-v11', // Especifico el estilo del mapa
  zoom: 14.5, // Especifico el zoom inicial
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

var draw = new MapboxDraw({
  displayControlsDefault: false, //Muestro solo las herramientas que necesito
  controls: {
    line_string: true,
    trash: true
  },
  styles: [
    {
      "id": "linea",
      "type": "line",
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#438EE4",
        "line-dasharray": [0.2, 2],
        "line-width": 4,
        "line-opacity": 0.7
      }
    },
    {
      "id": "punto",
      "type": "circle",
      "paint": {
        "circle-radius": 8,
        "circle-color": "#438EE4",
      }
    }
  ]
});

map.addControl(draw);

function obtenerInicioFinal() {
  var profile = "driving"; // El perfil de la ruta
  var data = draw.getAll(); // Se obtienen las coordenadas dibujadas en el mapa
  var lastFeature = data.features.length - 1;
  var coords = data.features[lastFeature].geometry.coordinates;
  var newCoords = coords.join(';'); // Se le da formato a las coordenadas
  var radius = []; // Se le da de radio a las coordenadas de 25 metros
  coords.forEach(element => {
    radius.push(25);
  });
  //console.log(newCoords);
  localStorage.setItem('newCoords', newCoords);
  obtenerRuta(newCoords, radius, profile);
}

function obtenerRuta(coordinates, radius, profile) {
  var radiuses = radius.join(';')
  var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;

  fetch(query)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var coords = json.matchings[0].geometry;
      //console.log("Coordenadas para pintar la ruta: " + coords.coordinates);
      pintarRuta(coords); //addRoute(coords);
    });
}

function pintarRuta(coords) {
  if (map.getSource('route')) {
    map.removeLayer('route')
    map.removeSource('route')
  } else {
    map.addLayer({
      "id": "route",
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
  };
}//fin funcion 

function removerRuta() {
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  } else {
    return;
  }
}//fin funcion

map.on('draw.create', obtenerInicioFinal);
map.on('draw.update', obtenerInicioFinal);
map.on('draw.delete', removerRuta);

function registrar() {

  /* let nombreRuta = document.getElementById('nombre').value;
   let coordenadas = localStorage.getItem('newCoords');
   console.log('Nombre de ruta: ' + nombreRuta + "\n" + 'Coordenadas: ' + coordenadas); */

  var nombre = document.getElementById('nombre').value;
  var coordenada = localStorage.getItem('newCoords');

  if (nombre == "" && coordenada == "") {
    swal({
      title: "Registro Incorrecto",
      text: "Debe completar todos los campos de manera correcta",
      icon: "warning",
      button: "Continuar",
    });
  }
  if (nombre == "" || coordenada == "") {
    swal({
      title: "Registro Incorrecto",
      text: "Debe completar todos los campos de manera correcta",
      icon: "warning",
      button: "Continuar",
    });
  } else {

    var valores = {
      nombre: document.getElementById('nombre').value,
      coordenada: localStorage.getItem('newCoords'),
      estado: 1
    };

    fetch('/registroRutas/insertar', {
      method: 'POST',
      body: JSON.stringify(valores),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.log('Error:', error))
      .then(response => console.log('Success:', response));
    swal({
      title: "Registro Correcto",
      text: "Registro Exitoso",
      icon: "success",
      button: "Continuar",
    });

    setTimeout(() => {
      window.location.replace(
        "../../sesiones_perfiles/sesionUsuarioRutas/index.html"
      )
    }, 2000);

  }

}//fin de registrar

