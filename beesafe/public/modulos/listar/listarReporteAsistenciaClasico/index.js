let table = document.getElementById('contenidoTablaVehiculo');

let usuarioSolicitante = localStorage.getItem('correo');
console.log(usuarioSolicitante);


async function postAsistenciaClasico(usuarioSolicitante) {
  valor = { usuarioSolicitante: usuarioSolicitante }
  const res = await fetch('/listarSiniestroAsistencia/recibirClasico', {
    method: 'POST',
    body: JSON.stringify(valor),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;
} //fin 


document.addEventListener("DOMContentLoaded", async function renderAsistencia() {

  var response = await  postAsistenciaClasico(usuarioSolicitante);
  console.log(response);

  for (let i = 0; i < response.length; i++) {


    let tr = document.createElement("tr");

    //categoriaIncidente
    let td_categoriaIncidente = document.createElement("td");
    let texto_categoriaIncidente = document.createTextNode
      (response[i].categoriaIncidente);
    td_categoriaIncidente.appendChild(texto_categoriaIncidente);
    tr.appendChild(td_categoriaIncidente);
    table.appendChild(tr);

    //tipoAsistencia
    let td_tipoAsistencia = document.createElement("td");
    let texto_tipoAsistencia = document.createTextNode
      (response[i].tipoAsistencia);
    td_tipoAsistencia.appendChild(texto_tipoAsistencia);
    tr.appendChild(td_tipoAsistencia);
    table.appendChild(tr);

    //descripcionIncidente
    let td_descripcionIncidente = document.createElement("td");
    let texto_descripcionIncidente = document.createTextNode
      (response[i].descripcionIncidente);
    td_descripcionIncidente.appendChild(texto_descripcionIncidente);
    tr.appendChild(td_descripcionIncidente);
    table.appendChild(tr);

    //rutaIncidente
    let td_rutaIncidente = document.createElement("td");
    let texto_rutaIncidente = document.createTextNode
      (response[i].rutaIncidente);
    td_rutaIncidente.appendChild(texto_rutaIncidente);
    tr.appendChild(td_rutaIncidente);
    table.appendChild(tr);

    //image
    let td_image = document.createElement("td");
    let anchor_image = document.createElement("a");
    anchor_image.classList.add("iconoEditarBorrar");

    let image_image = document.createElement("img");
    image_image.setAttribute("src", "../../.." + response[i].image);
    anchor_image.appendChild(image_image);

    td_image.appendChild(anchor_image);
    tr.appendChild(td_image);
    table.appendChild(tr);



    //especializado  usuarioEspecializado
    let td_especializado = document.createElement("td");
    let texto_especializado = document.createTextNode
      (response[i].usuarioEspecializado);
      td_especializado.appendChild(texto_especializado);
    tr.appendChild(td_especializado);
    table.appendChild(tr);

    //estado
    let td_estado = document.createElement("td");
    let texto_estado = document.createTextNode
      (response[i].estado == 0 ? 'Disponible' : 'Ocupado');
    td_estado.appendChild(texto_estado);
    tr.appendChild(td_estado);
    table.appendChild(tr);


  }

}); //fin de renderTipoVehiculo




function buscar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputBuscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("contenidoTablaVehiculo");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

async function borrarTipoVehiculo() {
  var response = await deleteTipoVehiculo()
  console.log(response);
  /* location.reload(); */
  window.location.reload(true);
}