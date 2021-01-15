const table = document.getElementById('contenidoTablaVehiculos');

async function postVehiculo() {


  valor = { identificador: localStorage.getItem('correo') };


  const res = await fetch('/listarVehiculoUEps/recibir', {
    method: 'POST',
    body: JSON.stringify(valor),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;

}
async function postVehiculo2() {


  valor2 = {chofer: localStorage.getItem('correo') };


  const res = await fetch('/listarVehiculoUEps/recibir2', {
    method: 'POST',
    body: JSON.stringify(valor2),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;

}
async function deleteVehiculo() {
  let id = localStorage.getItem('id');
  var enlace = ('/eliminarVehiculoUEps/borrar/' + id);
  const res = await fetch(enlace, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  });
  var data = await res.json();
  return data;
}

document.addEventListener("DOMContentLoaded", async function renderVehiculo() {

  let vehiculo = await postVehiculo();
  console.log(vehiculo);

  for (let i = 0; i < vehiculo.length; i++) {

    
   
  
    let tr = document.createElement("tr");
    
    vehiculo[i].activado==false? tr.classList.add('desactivado'):'';
    

    //marca
    let td_marca = document.createElement("td");
    let texto_marca = document.createTextNode
      (vehiculo[i].tipo_vehiculo);
    td_marca.appendChild(texto_marca);
    tr.appendChild(td_marca);
    table.appendChild(tr);

   

    //año
    let td_anno = document.createElement("td");
    let texto_anno = document.createTextNode
      (vehiculo[i].anno);
    td_anno.appendChild(texto_anno);
    tr.appendChild(td_anno);
    table.appendChild(tr);

    //placa vehiculo
    let td_placaVehi = document.createElement("td");
    let texto_placaVehi = document.createTextNode
      (vehiculo[i].placaVehi);
    td_placaVehi.appendChild(texto_placaVehi);
    tr.appendChild(td_placaVehi);
    table.appendChild(tr);

     //caracteristicasVehiculo 
     let td_caracteristicasVehiculo = document.createElement("td");
     let texto_caracteristicasVehiculo = document.createTextNode
       (vehiculo[i].caracteristicasVehiculo);
     td_caracteristicasVehiculo.appendChild(texto_caracteristicasVehiculo);
     tr.appendChild(td_caracteristicasVehiculo);
     table.appendChild(tr);

     //Chofer
     let td_chofer = document.createElement("td");
       let texto_chofer =
       vehiculo[i].chofer == undefined
        ? document.createTextNode(" ")
        : document.createTextNode(vehiculo[i].chofer);
     td_chofer.appendChild(texto_chofer);
     tr.appendChild(td_chofer);
     table.appendChild(tr);


    //modificar  
    let td_modificar = document.createElement("td");
    let anchor_modificar = document.createElement("a");
    anchor_modificar.classList.add("iconoEditarBorrar");

    let image_modificar = document.createElement("img");
    image_modificar.setAttribute("src", "../../../assets/img/edit.png");
    anchor_modificar.appendChild(image_modificar);

    anchor_modificar.addEventListener('click', () => {
      localStorage.setItem('id', vehiculo[i]._id);
      window.location.href = '../../modificar/modificarVehiculoUEps/index.html';
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
      localStorage.setItem('id', vehiculo[i]._id);
      borrarVehiculo();
    });

    td_eliminar.appendChild(anchor_eliminar);
    tr.appendChild(td_eliminar);
    table.appendChild(tr);

  }//fin de for

}); //fin de renderVehiculo
document.addEventListener("DOMContentLoaded", async function renderVehiculo2() {

  let vehiculo = await postVehiculo2();
  console.log(vehiculo);

  for (let i = 0; i < vehiculo.length; i++) {

    let tr = document.createElement("tr");

    //marca
    let td_marca = document.createElement("td");
    let texto_marca = document.createTextNode
      (vehiculo[i].tipo_vehiculo);
    td_marca.appendChild(texto_marca);
    tr.appendChild(td_marca);
    table.appendChild(tr);

    //modelo 
    let td_modelo = document.createElement("td");
    let texto_modelo = document.createTextNode
      (vehiculo[i].modelo);
    td_modelo.appendChild(texto_modelo);
    tr.appendChild(td_modelo);
    table.appendChild(tr);

    //año
    let td_anno = document.createElement("td");
    let texto_anno = document.createTextNode
      (vehiculo[i].anno);
    td_anno.appendChild(texto_anno);
    tr.appendChild(td_anno);
    table.appendChild(tr);

    //placa vehiculo
    let td_placaVehi = document.createElement("td");
    let texto_placaVehi = document.createTextNode
      (vehiculo[i].placaVehi);
    td_placaVehi.appendChild(texto_placaVehi);
    tr.appendChild(td_placaVehi);
    table.appendChild(tr);

     //Chofer
     let td_chofer = document.createElement("td");
       let texto_chofer =
       vehiculo[i].chofer == undefined
        ? document.createTextNode(" ")
        : document.createTextNode(vehiculo[i].chofer);
     td_chofer.appendChild(texto_chofer);
     tr.appendChild(td_chofer);
     table.appendChild(tr);

    //modificar  
   /*  let td_modificar = document.createElement("td");
    let anchor_modificar = document.createElement("a");
    anchor_modificar.classList.add("iconoEditarBorrar");

    let image_modificar = document.createElement("img");
    image_modificar.setAttribute("src", "../../../assets/img/edit.png");
    anchor_modificar.appendChild(image_modificar);

    anchor_modificar.addEventListener('click', () => {
      localStorage.setItem('id', vehiculo[i]._id);
      window.location.href = '../../modificar/modificarVehiculo/index.html';
    });

    td_modificar.appendChild(anchor_modificar);
    tr.appendChild(td_modificar);
    table.appendChild(tr); */

  

  }//fin de for

}); //fin de renderVehiculo

function buscar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputBuscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("contenidoTablaVehiculos");
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

async function borrarVehiculo() {
  var response = await deleteVehiculo();
  console.log(response);
  //location.reload(); 
  window.location.reload(true);
} 
