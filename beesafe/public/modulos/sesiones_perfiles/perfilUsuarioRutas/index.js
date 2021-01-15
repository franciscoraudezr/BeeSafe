let table = document.getElementById("contenidoTablaUsuarios");
let valor = { correo: localStorage.getItem('correo') };
id=localStorage.getItem('id')
contenidoUsuario = document.getElementById("contenidoUsuario");
contenidoBotones = document.getElementById("listadoUsuarios");
botonListo=true


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


  if (botonListo) {
    contenidoUsuario.innerHTML += `


    <button class="boton_2 alt_letra fondosG modificarBoton  " type="button">
        <a class="redireccion" onclick="modificar()" href="#">Guardar imagen</a>
    </button>
  
    <br>

    ${botonListo=''}
    
  `;
  }
  
 console.log(image)

}

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
      localStorage.setItem('id', usuario._id);

     

      contenidoUsuario.innerHTML += `
                      
                     
  
                      <div class="izquierda">
                      <h4>Nombre</h4>
                      <input class="fondosG " type="text" readonly value="${usuario.nombre}"  name="nombre" id="nombre">
                      <br> <br> 
  
                      <h4>Apellidos</h4>
                      <input class="fondosG " type="text" readonly value="${usuario.apellido}"  name="apellido" id="apellido">
                      <br><br>
  
                      <h4>Edad</h4>
                      <input class="fondosG " type="text" readonly value="${usuario.edad}"  name="edad" id="edad">
                      <br><br>
  
                      <h4>Cedula</h4>
                      <input class="fondosG " type="text" readonly value="${usuario.cedula}"  name="cedula" id="cedula">
  
                      <br> <br>
                      
                      <h4>Correo Electronico</h4>
                      <input class="fondosG  " type="text" readonly value="${usuario.correo}"  name="correo" id="correo">
                      <br> <br>
                      </div>

                      <div class="fotoperfilespacio">
                      <h4>Foto de perfil</h4>
                      <br> <br>

                      

                      <img class="fotoperfil" id="imagenAgregada" src="../../../../${usuario.image}" alt="">
                      ${usuario.image == undefined ? '<i class="far fa-image muestraIcono" id="muestraIcono"></i> <br> <br> ' : '<br><br>'} 
                      <img class="" id="imagenAgregada" alt=""> <br><br>
                  

                      
                      
                     

                      </div>

                      

                      <br>
                     
          
                          
          
                        
  
        `;

     
       

    })
    .catch(function (err) {
      console.log(err);
    });


 //fin 


function modificar() {

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
  
  
     
        var nombre= usuario.nombre
        var apellido= usuario.apellido
        var password=usuario.password
        var edad=usuario.edad
        var correo=usuario.correo
        var tipoCedula=usuario.tipoCedula
        var cedula=usuario.cedula
        var tipoAsistencia=usuario.tipoAsistencia
  
        console.log(nombre + 'probando');
  
        var enlace = ("/modificarUsuario/editarFoto/" + id);
         console.log(enlace);

  
  const formData = new FormData();
  formData.append('nombre',nombre);
  formData.append('apellido', apellido);
  formData.append('password', password);
  formData.append('edad', edad);
  formData.append('correo', correo);
  formData.append('tipoCedula', tipoCedula);
  formData.append('cedula', cedula);
  formData.append('tipoAsistencia', tipoAsistencia);
  
  formData.append('image', document.getElementById('image').files[0]);

  fetch(enlace, {
      method: 'PUT',
      body: formData,
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
    location.reload()
}, 2000);
  
  
    })
    .catch(function (err) {
      console.log(err);
    });
     
    
}//fin de modificar

