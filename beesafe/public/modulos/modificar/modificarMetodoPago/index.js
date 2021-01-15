
let id = localStorage.getItem('id');
console.log(id);

var enlace = ("/modificarMetodoPago/editar/" + id);
console.log(enlace);

const nombre = document.getElementById('nombre');
const numeroTarjeta = document.getElementById('numeroTarjeta');
const fecha = document.getElementById('fecha');
const cvv = document.getElementById('cvv');


async function postCampos(id) {
    valor = { _id: id }
    const res = await fetch('/modificarMetodoPago/recibir', {
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
    numeroTarjeta.value = response[0].numeroTarjeta;
    fecha.value = response[0].fecha;
    cvv.value = response[0].cvv;

}

llenarCampos();


function modificar() {
    let datos = ["nombre", "numeroTarjeta", "fecha", "cvv"];
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
                "../../listar/listarMetodoPago/index.html"
            )
        }, 2000);


    }

}//fin de registro