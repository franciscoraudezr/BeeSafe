
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

}//fin de subirImagen 

function registro() {
    let datos = ["nombre", "descripcion", "image"];
    let valores = {};
    let aprobado = false;

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
            aprobado = true;
        }
    }
    if (aprobado) {
        const formData = new FormData();
        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('descripcion', document.getElementById('descripcion').value);
        formData.append('image', document.getElementById('image').files[0]);

        fetch('/registroCategoriaIncidente/insertar', {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => console.log('Success:', response));

        swal({
            title: "Registro Correcto",
            text: "Registro Exitoso",
            icon: "success",
            button: "Continuar",
        });

        setTimeout(() => {
            window.location.replace(
            "../../listar/listarCategoriaIncidente/index.html"
          )
          }, 2000);
    }
}//fin de registro


