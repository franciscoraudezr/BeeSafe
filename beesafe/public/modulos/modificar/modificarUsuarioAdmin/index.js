contenidoUsuario = document.getElementById("contenidoUsuario");



valor = {
  correo: localStorage.getItem('correo')
};

fetch("http://localhost:5252/listarUsuario/recibir", {
  body: JSON.stringify(valor),
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(function (data) {
    return data.json();
  })
  .then(function (res) {

    usuario = res[0];
    console.log(res);

    contenidoUsuario.innerHTML += `

      
                    <h4>Nombre</h4>
                    <input class="fondosG " type="text" value="${usuario.nombre}"  name="nombre" id="nombre">
                    <br> <br> 

                    <h4>Apellidos</h4>
                    <input class="fondosG " type="text" value="${usuario.apellido}"  name="apellido" id="apellido">
                    <br><br>

                    <h4>Edad</h4>
                    <input class="fondosG " type="text" value="${usuario.edad}"  name="edad" id="edad">
                    <br><br>

                    <h4>Cedula</h4>
                    <input class="fondosG " type="text" value="${usuario.cedula}"  name="cedula" id="cedula">

                    <br> <br>
                    
                    <h4>Correo Electronico</h4>
                    <input class="fondosG  " type="text" value="${usuario.correo}"  name="correo" id="correo">
                    <br> <br>

                    <h4>Contraseña</h4>
                    <input class="fondosG  " type="text" value="${usuario.password}"  name="password" id="password">

      `;
  })
  .catch(function (err) {
    console.log(err);
  });








let id = localStorage.getItem('id');
console.log(id);

var enlace = ("/modificarUsuario/editar/" + id);
console.log(enlace);



function modificar() {
  let datos = ["nombre", "apellido", "edad", "cedula", "correo"];
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
      });//josue
      aprobado = false;
      break;
    } else {
      aprobado = true;
    }
  }
  if (aprobado) {

    fetch(enlace, {
      method: 'PUT',
      body: JSON.stringify(valores),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.log('Error:', error))
      .then(response => console.log('Success:', response));

    swal({
      title: "Modificación Correcta",
      text: "Campos completados de manera correcta",
      icon: "success",
      button: "Continuar",
    });

    setTimeout(() => {
      window.location.replace(
          "../../sesiones_perfiles/perfilUsuarioAdmin/index.html"
      )
  }, 2000);


  }

}
