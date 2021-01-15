table = document.getElementById("contenidoTablaTarjetas");


async function getMetodoPago() {

  valor = {
    identificador: localStorage.getItem('correo')
  };

  var response = await fetch("http://localhost:5252/listarMetodoPago/recibir", {
    body: JSON.stringify(valor),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  var data = await response.json();
  return data;
}//fin de getMetodoPago

async function deleteMetodoPago() {
  let id = localStorage.getItem('id');
  var enlace = ('/eliminarMetodoPago/borrar/' + id);
  const res = await fetch(enlace, {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json"
      }
  });
  var data = await res.json();
  return data;
}//fin de deleteTipoVehiculo 

document.addEventListener("DOMContentLoaded", async function renderCategoriaIncidente() {

  let metodoPago = await getMetodoPago();
  console.log(metodoPago);

  for (let i = 0; i < metodoPago.length; i++) {


    let tr = document.createElement("tr");

    //nombre
    let td_nombre = document.createElement("td");
    let texto_nombre = document.createTextNode
      (metodoPago[i].nombre);
    td_nombre.appendChild(texto_nombre);
    tr.appendChild(td_nombre);
    table.appendChild(tr);

    //numeroTarjeta
    let td_numeroTarjeta = document.createElement("td");
    let texto_numeroTarjeta = document.createTextNode
      (metodoPago[i].numeroTarjeta);
    td_numeroTarjeta.appendChild(texto_numeroTarjeta);
    tr.appendChild(td_numeroTarjeta);
    table.appendChild(tr);

    //fecha
    let td_fecha = document.createElement("td");
    let texto_fecha = document.createTextNode
      (metodoPago[i].fecha);
    td_fecha.appendChild(texto_fecha);
    tr.appendChild(td_fecha);
    table.appendChild(tr);

    //cvv
    let td_cvv = document.createElement("td");
    let texto_cvv = document.createTextNode
      (metodoPago[i].cvv);
    td_cvv.appendChild(texto_cvv);
    tr.appendChild(td_cvv);
    table.appendChild(tr);
    
    //modificar
    let td_modificar = document.createElement("td");
    let anchor_modificar = document.createElement("a");
    anchor_modificar.classList.add("iconoEditarBorrar");

    let image_modificar = document.createElement("img");
    image_modificar.setAttribute("src", "../../../assets/img/edit.png");
    anchor_modificar.appendChild(image_modificar);

    anchor_modificar.addEventListener('click', () => {
      localStorage.setItem('id', metodoPago[i]._id);
    /*   window.location.href = '../../modificar/modificarCategoriaIncidente/index.html'; */
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
      localStorage.setItem('id', metodoPago[i]._id);
      borrarMetodoPago();
    });

    td_eliminar.appendChild(anchor_eliminar);
    tr.appendChild(td_eliminar);
    table.appendChild(tr); 

  }//fin de for

}); //fin de renderTipoVehiculo

function buscar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputBuscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("contenidoTablaTarjetas");
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

async function borrarMetodoPago() {
  var response = await deleteMetodoPago()
  console.log(response);
  /* location.reload(); */
  window.location.reload(true);
  }