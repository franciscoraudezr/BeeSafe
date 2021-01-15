function enviar() {
    let datos = ['nombre', 'descripcion'];
    let valores = {};
    let aprobado = false;
    for (let dato of datos){
        valores[dato] = document.getElementById(dato).value;
    }
    for (let i in valores){
        if (valores[i] == "" ){
            swal({
                title: "Registro Incorrecto",
                text: "Debe completar todos los campos de manera correcta",
                icon: "warning",
                button: "Continuar",
              });//josue
            aprobado = false;
            break
        }
        else{
            (console.log("enviado"))
            aprobado = true
        }
    }
    if (aprobado){
        fetch("http://localhost:5252/registroCaracteristicaVehiculo/insertar", {
            method:"POST",
            body: JSON.stringify(valores),
            headers:{
                'content-Type': 'application/json'
            }
        })     .then(function(data){
            return data.json()
        })
        .then(function(res){
            console.log(res)
        })
        .catch(function(err){
            console.log(err)
        })

        swal({
            title: "Registro Correcto",
            text: "Registro Exitoso",
            icon: "success",
            button: "Continuar",
          });  


          setTimeout(() => {
            window.location.replace(
            "../../listar/listarCaracteristicasvehiculo/index.html"
          )
          }, 2000);


    }
}
