let table = document.getElementById("contenidoTablaUsuarios");

async function postListarUsuarios() {
  tipoUsuario = document.getElementById("tipoUsuarios").value;
  console.log(tipoUsuario);

  valor = {
    tipoUsuario: tipoUsuario,
  };

  const res = await fetch("/listarUsuarios/recibir", {
    method: "POST",
    body: JSON.stringify(valor),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
} //fin

async function deleteListarUsuarios() {
  let id = localStorage.getItem("id");
  var enlace = "/eliminarUsuario/borrar/" + id;
  const res = await fetch(enlace, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  var data = await res.json();

  return data;
} //fin

async function ordenar() {
  let listarUsuarios = await postListarUsuarios();

  table.innerHTML = "";

  for (let i = 0; i < listarUsuarios.length; i++) {
    let tr = document.createElement("tr");

    //nombre
    let td_nombre = document.createElement("td");
    let texto_nombre = document.createTextNode(listarUsuarios[i].nombre);
    td_nombre.appendChild(texto_nombre);
    tr.appendChild(td_nombre);
    table.appendChild(tr);

    //apellido
    let td_apellido = document.createElement("td");
    let texto_apellido = document.createTextNode(listarUsuarios[i].apellido);
    td_apellido.appendChild(texto_apellido);
    tr.appendChild(td_apellido);
    table.appendChild(tr);

    //edad
    let td_edad = document.createElement("td");
    let texto_edad = document.createTextNode(listarUsuarios[i].edad);
    td_edad.appendChild(texto_edad);
    tr.appendChild(td_edad);
    table.appendChild(tr);

    //tipoCedula
    let td_tipoCedula = document.createElement("td");
    let texto_tipoCedula = document.createTextNode(
      listarUsuarios[i].tipoCedula
    );
    td_tipoCedula.appendChild(texto_tipoCedula);
    tr.appendChild(td_tipoCedula);
    table.appendChild(tr);

    //cedula
    let td_cedula = document.createElement("td");
    let texto_cedula = document.createTextNode(listarUsuarios[i].cedula);
    td_cedula.appendChild(texto_cedula);
    tr.appendChild(td_cedula);
    table.appendChild(tr);

    //correo
    let td_correo = document.createElement("td");
    let texto_correo = document.createTextNode(listarUsuarios[i].correo);
    td_correo.appendChild(texto_correo);
    tr.appendChild(td_correo);
    table.appendChild(tr);

    //tipoAsistencia

  
    let td_tipoAsistencia = document.createElement("td");
    let texto_tipoAsistencia =
      listarUsuarios[i].tipoAsistencia == undefined
        ? document.createTextNode(" "):
        listarUsuarios[i].tipoAsistencia == 'undefined'
        ?document.createTextNode(" "):
         document.createTextNode(listarUsuarios[i].tipoAsistencia);
    td_tipoAsistencia.appendChild(texto_tipoAsistencia);
    tr.appendChild(td_tipoAsistencia);
    table.appendChild(tr);

    //modificar
    let td_modificar = document.createElement("td");
    let anchor_modificar = document.createElement("a");
    anchor_modificar.classList.add("iconoEditarBorrar");

    let image_modificar = document.createElement("img");
    image_modificar.setAttribute("src", "../../../assets/img/edit.png");
    anchor_modificar.appendChild(image_modificar);

    anchor_modificar.addEventListener("click", () => {
      localStorage.setItem("id", listarUsuarios[i]._id);
         window.location.href = '../../modificar/modificarUsuariosAdmin/index.html';
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

    anchor_eliminar.addEventListener("click", () => {
      localStorage.setItem("id", listarUsuarios[i]._id);
      borrarListarUsuarios();
    });

    td_eliminar.appendChild(anchor_eliminar);
    tr.appendChild(td_eliminar);
    table.appendChild(tr);
  } //fin de for

  //fin de renderListarUsuarios
}
ordenar();

function buscar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("inputBuscar");
  filter = input.value.toUpperCase();
  table = document.getElementById("contenidoTablaUsuarios");
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

async function borrarListarUsuarios() {
  var response = await deleteListarUsuarios();
  console.log(response);
  /* location.reload(); */
  window.location.reload(true);
}
