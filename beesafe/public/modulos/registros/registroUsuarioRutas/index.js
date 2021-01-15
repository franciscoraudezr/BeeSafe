function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

    function subirImagen() {
    
      console.dir(document.getElementById('imagenAgregada'));
        var archivo = document.getElementById("image").files[0];
        var reader = new FileReader();
        if (image) {
          reader.readAsDataURL(archivo);
          reader.onloadend = function () {
            document.getElementById("imagenAgregada").src = reader.result;
            document.getElementById("imagenAgregada").classList.add('imagenAgregada');
            document.getElementById('muestraIcono').remove()
        }
      } 
    
    }

/************************************************************
     Codigo Validacion
     ****************************************************/
 
     async function enviar() {
      
        let datos = ['nombre', 'apellido', 'edad', 'correo', 'tipoCedula','cedula'];
        let valores = new FormData();
        let aprobado = false;
        regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        for (let dato of datos) {
         valores.append( dato, document.getElementById(dato).value);
        }
        
        for (let par of valores.entries()) {
          // mostramos los pares de valores
          console.log(par[0]+ ', '+ par[1]);
          if (par[1] == "" || !regexCorreo.test(correo.value)) {
 
            swal({
              title: "Registro Incorrecto",
              text: "Debe completar todos los campos de manera correcta",
              icon: "warning",
              button: "Continuar",
            });
            aprobado = false;
            break;
          } else {
  
        
            aprobado = true;
          }
        }
        
        if (aprobado) {
  
        let existente;
       
        valores.append( 'password' , 'beesafe'+getRandomInt(300));


        fetch1 = await fetch("http://localhost:5252/listarUsuario/recibir", {
        body: JSON.stringify({correo:document.getElementById('correo').value}),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })   
        .then(function(data) {
          return data.json();
        })
        .then(function(res) {
          existente = res[0].correo;
          
        })
        .catch(function(err) {
          console.log(err);
        });
  
        if (existente == document.getElementById('correo').value) { 
  
          swal({
            title: "Registro Incorrecto",
            text: "Usuario ya registrado",
            icon: "warning",
            button: "Continuar",
          });
          
        } else{
          fetch2 = await fetch("http://localhost:5252/registroUsuarioRutas/insertar", {
            body: valores,
            method: "POST",

          })
            .then(function(data) {
              return data.json();
            })
            .then(function(res) {
              console.log(res);
            })
            .catch(function(err) {
              console.log(err);
            });
      
            swal({
              title: "Registro Correcto",
              text: "Registro Exitoso",
              icon: "success",
              button: "Continuar",
            });
         
            setTimeout(() => {
              window.location.replace(
              "../../listar/listarUsuarios/index.html"
            )
            }, 2000);
  
        }
        
          
        }
      }
      