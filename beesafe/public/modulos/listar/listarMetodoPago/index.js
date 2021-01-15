let table = document.getElementById("contenidoTablaTarjetas");
let valor = { identificador: localStorage.getItem('correo') };

async function postListadoMetodoPago() {
  const res = await fetch('/listarMetodoPago/recibir', {
      method: 'POST',
      body: JSON.stringify(valor),
      headers: {
          "Content-Type": "application/json"
      }
  });
  const data = await res.json();
  return data;
}//fin

async function deleteListadoMetodoPago() {
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
}//fin  


document.addEventListener("DOMContentLoaded", async function renderListadoMetodoPago() {

  let listadoMetodoPago = await postListadoMetodoPago();
  console.log(listadoMetodoPago);

  for (let i = 0; i < listadoMetodoPago.length; i++) {

    let tr = document.createElement("tr");

    //nombre
    let td_nombre = document.createElement("td");
    let texto_nombre = document.createTextNode
      (listadoMetodoPago[i].nombre);
    td_nombre.appendChild(texto_nombre);
    tr.appendChild(td_nombre);
    table.appendChild(tr);

    //num
    let td_num = document.createElement("td");
    let texto_num = document.createTextNode
      (listadoMetodoPago[i].numeroTarjeta);
    td_num.appendChild(texto_num);
    tr.appendChild(td_num);
    table.appendChild(tr);

    //fecha
    let td_fecha = document.createElement("td");
    let texto_fecha = document.createTextNode
      (listadoMetodoPago[i].fecha);
    td_fecha.appendChild(texto_fecha);
    tr.appendChild(td_fecha);
    table.appendChild(tr);

    /* //cvv
    let td_cvv = document.createElement("td");
    let texto_cvv = document.createTextNode
      (listadoMetodoPago[i].cvv);
    td_cvv.appendChild(texto_cvv);
    tr.appendChild(td_cvv);
    table.appendChild(tr);
 */
    //modificar
    let td_modificar = document.createElement("td");
    let anchor_modificar = document.createElement("a");
    anchor_modificar.classList.add("iconoEditarBorrar");

    let image_modificar = document.createElement("img");
    image_modificar.setAttribute("src", "../../../assets/img/edit.png");
    anchor_modificar.appendChild(image_modificar);

    anchor_modificar.addEventListener('click', () => {
      localStorage.setItem('id', listadoMetodoPago[i]._id);
      window.location.href = '../../modificar/modificarMetodoPago/index.html';
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
      localStorage.setItem('id', listadoMetodoPago[i]._id);
      borrarListadoMetodoPago();
    });

    td_eliminar.appendChild(anchor_eliminar);
    tr.appendChild(td_eliminar);
    table.appendChild(tr); 

  }//fin de for

}); //fin de renderListadoMetodoPago


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

async function borrarListadoMetodoPago() {
  var response = await deleteListadoMetodoPago();
  console.log(response);
  /* location.reload(); */
  window.location.reload(true);
  }