

contenidoUsuario = document.getElementById("contenidoUsuario");
valor = {
  id: localStorage.getItem("id"),
};

fetch("http://localhost:5252/listarVehiculo/recibir3", {
  body: JSON.stringify(valor),
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (data) {
    return data.json();
  })
  .then(function (res) {
    usuario = res[0];
    console.log(res);

    contenidoUsuario.innerHTML += `
  
  
                      <h4>Tipo de vehiculo</h4>
                      <select class="fondosG" value="" name="tipo_vehiculo" id="tipo_vehiculo">
                        <option value="${usuario.tipo_vehiculo}" selected hidden>${usuario.tipo_vehiculo}</option>  
                      </select> 
                      <br><br>
  
                      <h4>Año</h4>
                      <input class="fondosG " type="text" value="${usuario.anno}"  name="anno" id="anno">
                      <br><br>

                      <h4>Numero de placa</h4>
                      <input class="fondosG " type="text" value="${usuario.placaVehi}"  name="placaVehi" id="placaVehi">
                      <br> <br> 

                      <h4>caracteristicas de vehiculo</h4>
                      <select class="fondosG" value="${usuario.caracteristicasVehiculo}" name="caracteristicasVehiculo" id="caracteristicasVehiculo">
                      <option value="" selected hidden>${usuario.caracteristicasVehiculo}</option>
                      </select> 
                      <br><br>
  
                      <h4>Conductor</h4>
                      <input class="fondosG " type="text" value="${usuario.chofer}"  name="chofer" id="chofer">
  
                     
  
        `;
  })
  .catch(function (err) {
    console.log(err);
  });

function modificar() {
  let id = localStorage.getItem("id");
  console.log(id);
  var enlace = "/modificarVehiculo/editar/" + id;
  console.log(enlace);

  let datos = ["placaVehi", "anno", "chofer"];
  let valores = {};
  let aprobado = false;

  for (let dato of datos) {
    valores[dato] = document.getElementById(dato).value;
  }
  for (let i in valores) {
    if (valores[i] == "") {
      swal({
        title: "Modificación Incorrecta",
        text: "Debe completar todos los campos de manera correcta",
        icon: "warning",
        button: "Continuar",
      }); //josue
      aprobado = false;
      break;
    } else {
      aprobado = true;
    }
  }
  if (aprobado) {
    fetch(enlace, {
      method: "PUT",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error:", error))
      .then((response) => console.log("Success:", response));

    swal({
      title: "Modificación Correcta",
      text: "Campos completados de manera correcta",
      icon: "success",
      button: "Continuar",
    });

    setTimeout(() => {
      window.location.replace("../../listar/listarVehiculosUEsp/index.html");
    }, 2000);
  }
} //fin

async function getCaracteristicas() {
    var response = await fetch("/listarCaracteristicasVehiculo/recibir");
    var data = await response.json();
    return data;
  } //fin de getCaracteristicas
  
  
  
  
  async function llenarCaracteristicas() {
    var incidente = await getCaracteristicas();
    console.log(incidente);
  
    console.log(select);
  
    for (var i = 0; i < incidente.length; i++) {
      var select = document.getElementById("caracteristicasVehiculo");
      var option = document.createElement("option");
      option.value = incidente[i].nombre;
      option.text = incidente[i].nombre;
      select.appendChild(option);
    }
  } //fin
  
  async function gettipovehiculo() {
    var response = await fetch("/listarTipoVehiculo/recibir");
    var data = await response.json();
    return data;
  } //fin de gettipovehiculo
  
  
  async function llenarTipoVehiculo() {
    var incidente = await gettipovehiculo();
    console.log(incidente);
  
    console.log(select);
  
    for (var i = 0; i < incidente.length; i++) {
      var select = document.getElementById("tipo_vehiculo");
      var option = document.createElement("option");
      option.value = incidente[i].nombre;
      option.text = incidente[i].nombre;
      select.appendChild(option);
    }
  } //fin
  llenarTipoVehiculo();
  llenarCaracteristicas();