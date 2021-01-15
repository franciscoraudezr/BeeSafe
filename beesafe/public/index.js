
function validarLogin() {
  var data = {
    correo: document.getElementById("correo").value,
    password: document.getElementById("password").value,
  };

  console.log(data);
  fetch("/login/inicio", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      if (response.status != 200)
        console.log("Ocurrió un error con el servicio: " + response.status);
      else return response.json();
    })
    .then(function (response) {
      if (response.length > 0) {
        if (
          document.getElementById("password").value == response[0]["password"]
        ) {
          console.log(response[0].tipoUsuario);
          response[0].tipoUsuario == 0
            ? localStorage.setItem("usuario", "0") &
            localStorage.setItem("correo", response[0].correo)
            : response[0].tipoUsuario == 1
              ? localStorage.setItem("usuario", "1") &
              localStorage.setItem("correo", response[0].correo)
              : response[0].tipoUsuario == 2
                ? localStorage.setItem("usuario", "2") &
                localStorage.setItem("correo", response[0].correo)
                : response[0].tipoUsuario == 3
                  ? localStorage.setItem("usuario", "3") &
                  localStorage.setItem("correo", response[0].correo)
                  : "Invalido";
          console.log(response);

          var galleta = localStorage.getItem("usuario");

          galleta == 0
            ? window.location.replace(
              "/modulos/sesiones_perfiles/sesionUsuarioAdmin/index.html"
            )
            : galleta == 1
              ? window.location.replace(
                "/modulos/sesiones_perfiles/sesionUsuarioClasico/index.html"
              )
              : galleta == 2
                ? window.location.replace(
                  "/modulos/sesiones_perfiles/sesionUsuarioEspecializado/index.html"
                )
                : galleta == 3
                  ? window.location.replace(
                    "/modulos/sesiones_perfiles/sesionUsuarioRutas/index.html"
                  )
                  : console.log("invalido");
        } else

          swal({
            title: "Contraseña incorrecta",
            text: "Debe introducir una contraseña válida",
            icon: "warning",
            button: "Continuar",
          });

      } else {

        swal({
          title: "Usuario Inválido",
          text: "El usuario ingresado no existe",
          icon: "warning",
          button: "Continuar",
        });

      }

    })
    .catch(function (err) {
      console.log("Ocurrió un error con la ejecución", err);
    });
}

var galleta = localStorage.getItem("usuario");
galleta == 0
  ? window.location.replace(
    "/modulos/sesiones_perfiles/sesionUsuarioAdmin/index.html"
  )
  : galleta == 1
    ? window.location.replace(
      "/modulos/sesiones_perfiles/sesionUsuarioClasico/index.html"
    )
    : galleta == 2
      ? window.location.replace(
        "/modulos/sesiones_perfiles/sesionUsuarioEspecializado/index.html"
      )
      : galleta == 3
        ? window.location.replace(
          "/modulos/sesiones_perfiles/sesionUsuarioRutas/index.html"
        )
        : console.log("invalido");

/*function validarLogin() {
    var data = {
      correo: document.getElementById('correo').value,
      password: document.getElementById('password').value
    };

    console.log(data)
    fetch('/login/inicio', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
    .then(
      function(response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else

          return response.json();
      }
    )
    .then (
      function(response) {
        if (response.length>0) {
          if (document.getElementById('password').value == response[0]['password']) {
              console.log(response[0].tipoUsuario)
                        response[0].tipoUsuario == 0 ? document.cookie = 'conectado = 0' && localStorage.setItem('usuario', '0') :
                        response[0].tipoUsuario == 1 ? document.cookie = 'conectado = 1':
                        response[0].tipoUsuario == 2 ? document.cookie = 'conectado = 2':
                        response[0].tipoUsuario == 3 ? document.cookie = 'conectado = 3':
                        'Invalido';
            console.log(response)

            var cookieConectado = document.cookie.split('=');

                        cookieConectado[1] == 0 ? window.location.replace("/modulos/sesiones_perfiles/sesionUsuarioAdmin/index.html"):
                        cookieConectado[1] == 1 ? window.location.replace("/modulos/sesiones_perfiles/sesionUsuarioClasico/index.html"):
                        cookieConectado[1] == 2 ? window.location.replace("/modulos/sesiones_perfiles/sesionUsuarioEspecializado/index.html"):
                        cookieConectado[1] == 3 ? window.location.replace("/modulos/sesiones_perfiles/sesionUsuarioRutas/index.html"):
                        console.log('ejecucion');

          }
          else
            alert('Contraseña incorrecta')
        } else {
          alert('Este usuario no existe');

        }
      }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );

  }*/
