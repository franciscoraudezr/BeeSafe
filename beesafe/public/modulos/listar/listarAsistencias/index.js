let table = document.getElementById('contenidoTablaVehiculo');


async function getTipoVehiculo() {
    var response = await fetch('/listarTiposAsistencia/recibir');
    var data = await response.json();
    return data;
}//fin de getTipoVehiculo

async function deleteTipoVehiculo() {

  let id = localStorage.getItem('id');
  var enlace = ('/eliminarTipoAsistencia/borrar/' + id);
  const res = await fetch(enlace, {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json"
      }
  });
  var data = await res.json();
  return data;

}//fin de deleteTipoVehiculo 

document.addEventListener("DOMContentLoaded", async function renderTipoVehiculo() {

    let tipoVehiculo = await getTipoVehiculo();
    console.log(tipoVehiculo);
  
    for (let i = 0; i < tipoVehiculo.length; i++) {
  
  
      let tr = document.createElement("tr");
      
      //nombre
      let td_nombre = document.createElement("td");
      let texto_nombre = document.createTextNode
        (tipoVehiculo[i].nombre);
      td_nombre.appendChild(texto_nombre);
      tr.appendChild(td_nombre);
      table.appendChild(tr);
    
 
    
      //descripcion
      let td_descripcion = document.createElement("td");
      let texto_descripcion = document.createTextNode
        (tipoVehiculo[i].descripcion);
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
        localStorage.setItem('id', tipoVehiculo[i]._id);
        window.location.href = '../../modificar/modificarTipoAsistencia/index.html';
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
        localStorage.setItem('id', tipoVehiculo[i]._id);
        borrarTipoVehiculo();
      });
    
      td_eliminar.appendChild(anchor_eliminar);
      tr.appendChild(td_eliminar);
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