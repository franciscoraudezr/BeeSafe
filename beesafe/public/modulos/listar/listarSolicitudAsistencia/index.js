let table = document.getElementById("contenidoTablaUsuarios");
let valor = { correo: localStorage.getItem("correo") };
id = localStorage.getItem("id");
contenidoUsuario = document.getElementById("contenidoUsuario");
contenidoBotones = document.getElementById("listadoUsuarios");
usuarioSolicitante = localStorage.getItem("correo");
/* console.log(usuarioSolicitante); */

longitud = parseFloat(localStorage.getItem("longitud"));
latitud = parseFloat(localStorage.getItem("latitud"));
console.log(longitud);
console.log(latitud);


async function getSiniestroAsistencia() {
  //valor = { identificador: localStorage.getItem('correo') };

  valor = { id: localStorage.getItem("id") };
  const res = await fetch("/listarSiniestroAsistencia/recibirIndividual", {
    method: "POST",
    body: JSON.stringify(valor),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
} //fin de getTipoAsistencia

llenarDatos();

async function llenarDatos() {
  var siniestroAsistencia = await getSiniestroAsistencia();
  console.log(siniestroAsistencia);

  // los mostramos
  for (var i = 0; i < siniestroAsistencia.length; i++) {
    document.getElementById("tipoAsistencia").value =
      siniestroAsistencia[i].tipoAsistencia;

    document.getElementById("rutaIncidente").value =
      siniestroAsistencia[i].rutaIncidente;

    document.getElementById("categoriaIncidente").value =
      siniestroAsistencia[i].categoriaIncidente;

    document.getElementById("metodoPago").value =
      siniestroAsistencia[i].metodoPago;
      
    document.getElementById("descripcionIncidente").value =
      siniestroAsistencia[i].descripcionIncidente;
       
    document.getElementById("imagenAgregada").src =
    siniestroAsistencia[i].image;

     //los guardamos en variables:

   


  }


 
} //fin



async function buscarIcono() {
  var incidenteSelect = document.getElementById("categoriaIncidente").value;
  var incidente = await getCategoriaIncidente();
  for (i = 0; i < incidente.length; i++) {
    if (incidente[i].nombre == incidenteSelect) {
      var image = incidente[i].image;
      console.log(image);
      return image;
    }
  }
} //fin



 async function enviar() {


  valor = { estado:1,
    usuarioEspecializado:localStorage.getItem('correo') };
  const res = await fetch("/listarSiniestroAsistencia/editar/"+ id, {
    method: "PUT",
    body: JSON.stringify(valor),
    headers: {
      "Content-Type": "application/json",
    },
  });
 
  swal({
    title: "Asistencia Aceptada",
    
    icon: "success",
    button: "Continuar",

    
});
setTimeout(() => {
  window.location.replace(
      "../../listar/listarReporteAsistenciaEspecializado/index.html"
  )
}, 2033); 




 


} //fin de enviar

function mostrarIcono() {
  var longitud = parseFloat(localStorage.getItem("longitud"));
  var latitud = parseFloat(localStorage.getItem("latitud"));
  console.log(longitud);
  console.log(latitud);

  var incidente = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitud, latitud],
        },
        properties: {
          title: "Incidente",
          description: "Incidente Reportado",
        },
      },
    ],
  };

  // add markers to map
  incidente.features.forEach(function (marker) {
    var el = document.createElement("div");
    var image = document.createElement("img");
    image.setAttribute("src", "../../../assets/img/mapbox-icon.png");
    image.classList.add("icon");
    el.appendChild(image);
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  });
} //fin de mostrarIcono
