let table = document.getElementById("contenidoTablaUsuarios");
let valor = { correo: localStorage.getItem('correo') };
id = localStorage.getItem('id')
contenidoUsuario = document.getElementById("contenidoUsuario");
contenidoBotones = document.getElementById("listadoUsuarios");
usuarioSolicitante = localStorage.getItem('correo');
/* console.log(usuarioSolicitante); */

longitud = parseFloat(localStorage.getItem('longitud'));
latitud = parseFloat(localStorage.getItem('latitud'));
console.log(longitud);
console.log(latitud); 

function habilitar() {

  habilita = document.getElementById('habilitar').value
  if (habilita == 1) {
    document.getElementById('metodoPago').removeAttribute('hidden', false)
    document.getElementById('tipoAsistencia').removeAttribute('hidden', false)
  } else {
    document.getElementById('metodoPago').setAttribute('hidden', true)
    document.getElementById('tipoAsistencia').setAttribute('hidden', true)
  }
  
}
function subirImagen() {

  console.dir(document.getElementById('imagenAgregada'));
  var archivo = document.getElementById("image").files[0];
  var reader = new FileReader();
  if (image) {
    reader.readAsDataURL(archivo);
    reader.onloadend = function () {
      document.getElementById("imagenAgregada").src = reader.result;
      document.getElementById("imagenAgregada").classList.add('imagenAgregada');
      document.getElementById('muestraIcono').remove()


    }
  }
 
  /* console.log(image) */

}

async function getCategoriaIncidente() {
  var response = await fetch('/listarCategoriaIncidente/recibir');
  var data = await response.json();
  return data;
}//fin de getCategoriaIncidente

async function getTipoAsistencia() {
  var response = await fetch('/listarTiposAsistencia/recibir');
  var data = await response.json();
  return data;
}//fin de getTipoAsistencia

async function getTipometodoPago() {

  valor = { identificador: localStorage.getItem('correo') };


  const res = await fetch('/listarMetodoPago/recibir', {
    method: 'POST',
    body: JSON.stringify(valor),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;

}//fin de getTipoAsistencia


async function getListarRutas() {
  var response = await fetch('/listarRutas/recibir');
  var data = await response.json();
  return data;
}//fin de getListarRutas

llenarIncidente();
llenarRuta();
llenarAsistencia();
llenarMetodoPago();

async function llenarIncidente() {

  var incidente = await getCategoriaIncidente();
  console.log(incidente);

  for (var i = 0; i < incidente.length; i++) {

    var select = document.getElementById('categoriaIncidente');
    var option = document.createElement('option');
    option.value = incidente[i].nombre;
    option.text = incidente[i].nombre;
    select.appendChild(option);
  }

}//fin 

async function llenarAsistencia() {

  var asistencia = await getTipoAsistencia();
  console.log(asistencia);

  for (var i = 0; i < asistencia.length; i++) {

    var select = document.getElementById('tipoAsistencia');
    var option = document.createElement('option');
    option.value = asistencia[i].nombre;
    option.text = asistencia[i].nombre;
    select.appendChild(option);
  }

}//fin 

async function llenarMetodoPago() {

  var metodoPago = await getTipometodoPago();
  console.log(metodoPago);

  for (var i = 0; i < metodoPago.length; i++) {

    var select = document.getElementById('metodoPago');
    var option = document.createElement('option');
    option.value = metodoPago[i].numeroTarjeta;
    option.text = metodoPago[i].numeroTarjeta;
    select.appendChild(option);
  }

}//fin 

async function llenarRuta() {

  var rutas = await getListarRutas();
  console.log(rutas);

  for (var i = 0; i < rutas.length; i++) {

    var select = document.getElementById('rutaIncidente');
    var option = document.createElement('option');
    option.value = rutas[i].nombre;
    option.text = rutas[i].nombre;
    select.appendChild(option);
  }

}//fin

async function buscarIcono() {
  var incidenteSelect = document.getElementById('categoriaIncidente').value;
  var incidente = await getCategoriaIncidente();
  for (i = 0; i < incidente.length; i++) {

    if (incidente[i].nombre == incidenteSelect) {
      var image = incidente[i].image
      console.log(image);
      return image;
    }

  }
}//fin 

async function enviar() {

  let datos = ['categoriaIncidente', 'rutaIncidente', 'descripcionIncidente'];
  let valores = new FormData();
  let aprobado = false;
  regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  for (let dato of datos) {
    valores.append(dato, document.getElementById(dato).value);
    console.log(dato);
  }

  for (let par of valores.entries()) {
    // mostramos los pares de valores
    console.log(par[0] + ', ' + par[1]);
    if (par[1] == "") {

      swal({
        title: "Registro Incorrecto",
        text: "Debe completar todos los campos de manera correcta",
        icon: "warning",
        button: "Continuar",
      });
      aprobado = false;
      break;
    } else {


      aprobado = true;
    }
  }

  if (aprobado) {

    var iconoIncidente = await buscarIcono();
    valores.append('metodoPago', document.getElementById('metodoPago').value);
    valores.append('tipoAsistencia', document.getElementById('tipoAsistencia').value);
    valores.append('iconoIncidente', iconoIncidente);
    valores.append('image', document.getElementById('image').files[0]);
    valores.append('longitud', longitud);
    valores.append('latitud', latitud);
    valores.append('usuarioSolicitante', usuarioSolicitante);

    fetch("http://localhost:5252/registroSiniestroAsistencia/insertar", {
      body: valores,
      method: "POST",

    })
      .then(function (data) {
        return data.json();
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });

    swal({
      title: "Reporte de siniestro exitoso",
      text: "Se han completado los campos correctamente",
      icon: "success",
      button: "Continuar",
    });

    mostrarIcono();

    setTimeout(() => {
      window.location.replace(
      "../../sesiones_perfiles/sesionUsuarioClasico/index.html"
    )
    }, 2000);

  }

}//fin de enviar

function mostrarIcono() {

  var longitud = parseFloat(localStorage.getItem('longitud'));
  var latitud = parseFloat(localStorage.getItem('latitud'));
  console.log(longitud);
  console.log(latitud);

  var incidente = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitud, latitud]
        },
        properties: {
          title: 'Incidente',
          description: 'Incidente Reportado'
        }
      }]
  };

  // add markers to map
  incidente.features.forEach(function (marker) {

    var el = document.createElement('div');
    var image = document.createElement("img");
    image.setAttribute("src", "../../../assets/img/mapbox-icon.png");
    image.classList.add("icon");
    el.appendChild(image);
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

  });

}//fin de mostrarIcono