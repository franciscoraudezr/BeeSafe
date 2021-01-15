/************************************************************
     Codigo Validacion de Elio
     ****************************************************/  
  


    async function enviar() {
        let datos = [ 'nombre', "numeroTarjeta", "fecha", "cvv"];
        let valores = {};
        let aprobado = false;
        regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        for (let dato of datos) {
          
          valores[dato] = document.getElementById(dato).value;
        }
        for (let i in valores) {
          if (valores[i] == "") {
            swal({
              title: "Registro Incorrecto",
              text: "Debe completar todos los campos de manera correcta",
              icon: "warning",
              button: "Continuar",
            });//josue
            aprobado = false;
            break;
          } else {
            console.log("Enviado");
            aprobado = true;
          }
        }
        console.log(valores.nombre);
  
        if (aprobado) {
  
        console.log(valores);
        valores['identificador'] = localStorage.getItem("correo")
           fetch2 = await fetch("http://localhost:5252/registroMetodoPago/insertar", {
            body: JSON.stringify(valores),
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
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
              "../../listar/listarMetodoPago/index.html"
            )
            }, 2000);
        
        
          
        }
      }
      