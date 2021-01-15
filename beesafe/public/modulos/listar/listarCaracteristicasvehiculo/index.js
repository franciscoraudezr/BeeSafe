const table = document.getElementById('contenidoTablaCaracteristicas');

async function getCaracteristicasVehiculo() {
  var response = await fetch('/listarCaracteristicasVehiculo/recibir');
  var data = await response.json();
  return data;
}//fin

async function deleteCaracteristicasVehiculo() {
  let id = localStorage.getItem('id');
  var enlace = ('/eliminarCaracteristicasVehiculo/borrar/' + id);
  const res = await fetch(enlace, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  });
  var data = await res.json();
  return data;
}//fin

document.addEventListener("DOMContentLoaded", async function renderCaracteristicasVehiculo() {

  let caracteristicas = await getCaracteristicasVehiculo();
  console.log(caracteristicas);

  for (let i = 0; i < caracteristicas.length; i++) {

    let tr = document.createElement("tr");

    //nombre
    let td_nombre = document.createElement("td");
    let texto_nombre = document.createTextNode
      (caracteristicas[i].nombre);
    td_nombre.appendChild(texto_nombre);
    tr.appendChild(td_nombre);
    table.appendChild(tr);

    //descripcion
    let td_descripcion = document.createElement("td");
    let texto_descripcion = document.createTextNode
      (caracteristicas[i].descripcion);
    td_descripcion.appendChild(texto_descripcion);
    tr.appendChild(td_descripcion);
    table.appendChild(tr);

    //modificar  
    let td_modificar = document.createElement("td");
    let anchor_modificar = document.createElement("a");
    anchor_modificar.classList.add("iconoEditarBorrar");

    let image_modificar = document.createElement("img");
    image_modificar.setAttribute("src", "../../../assets/img/edit.png");
    anchor_modificar.appendChild(image_modificar);

    anchor_modificar.addEventListener('click', () => {
      localStorage.setItem('id', caracteristicas[i]._id);
      window.location.href = '../../modificar/modificarCaracteristicasVehiculo/index.html';
    });

    td_modificar.appendChild(anchor_modificar);
    tr.appendChild(td_modificar);
    table.appendChild(tr);

    //eliminar
    let td_eliminar = document.createElement("td");
    let anchor_eliminar = document.createElement("a");
    anchor_eliminar.classList.add("iconoEditarBorrar");

    let image_eliminar = document.createElement("img");
    image_eliminar.setAttribute("src", "../../../assets/img/delete.png");
    anchor_eliminar.appendChild(image_eliminar);

    anchor_eliminar.addEventListener('click', () => {
      localStorage.setItem('id', caracteristicas[i]._id);
      borrarCaracteristicasVehiculo();
    });

    td_eliminar.appendChild(anchor_eliminar);
    tr.appendChild(td_eliminar);
    table.appendChild(tr);

  }//fin de for

}); //fin de renderVehiculo

function buscar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputBuscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("contenidoTablaCaracteristicas");
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

async function borrarCaracteristicasVehiculo() {
  var response = await deleteCaracteristicasVehiculo();
  console.log(response);
  //location.reload(); 
  window.location.reload(true);
}
