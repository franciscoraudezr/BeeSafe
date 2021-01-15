
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

} //fin de subirImagen 

let id = localStorage.getItem('id');
console.log(id);

var enlace = ("/modificarCategoriaIncidente/editar/" + id);
console.log(enlace);

const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');

async function postCampos(id) {
    valor = { _id: id }
    const res = await fetch('/modificarCategoriaIncidente/recibir', {
        method: 'POST',
        body: JSON.stringify(valor),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return data;
}//fin 

async function llenarCampos() {
    var response = await postCampos(id);
    console.log(response);

    nombre.value = response[0].nombre;
    descripcion.value = response[0].descripcion;
}

llenarCampos();

function modificar() {
    let datos = ["nombre", "descripcion", "image"];
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
        const formData = new FormData();
        formData.append('nombre', document.getElementById('nombre').value);
        formData.append('descripcion', document.getElementById('descripcion').value);
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
            window.location.replace(
                "../../listar/listarCategoriaIncidente/index.html"
            )
        }, 2000);
    }
}//fin de modificar



