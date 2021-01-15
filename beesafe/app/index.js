var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');

mongoose.connect('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log(`Base de datos conectada`))
    .catch(err => console.error(err));



const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/assets/uploads'),
    filename(req, file, cb) {
        cb(null, file.originalname); // new Date().getTime() + path.extname
    }
})

app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false }));



app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// recibir llamados

// Verificar Usuario , LOGIN
app.use('/login', require('./servicios/login'));

//Registrar,listar,modificar,eliminar Usuarios
app.use('/registroUsuarioEspecializado', require('./servicios/registroUsuarioEspecializado.js'));
app.use('/registroUsuarioClasico', require('./servicios/registroUsuarioClasico.js'));
app.use('/registroUsuarioRutas', require('./servicios/registroUsuarioRutas'));
app.use('/listarUsuarios', require('./servicios/listarUsuarios'));
app.use('/listarUsuario', require('./servicios/listarUsuario'));
app.use('/listarUsuariosAdmin', require('./servicios/listarUsuariosAdmin'));
app.use('/eliminarUsuario', require('./servicios/eliminarUsuario'));
app.use('/modificarUsuario', require('./servicios/modificarUsuario'));

//Registrar,listar,modificar,eliminar Rutas
app.use('/registroRutas', require('./servicios/registroRutas'));
app.use('/listarRutas', require('./servicios/listarRutas'));
app.use('/eliminarRutas', require('./servicios/eliminarRutas'));


//Registrar,listar,modificar,eliminar Siniestro
app.use('/reporteSiniestro', require('./servicios/reportarSiniestro.js'));


//Registrar,listar,modificar,eliminar SiniestroAsistencia
app.use('/registroSiniestroAsistencia', require('./servicios/registroSiniestroAsistencia'));
app.use('/listarSiniestroAsistencia', require('./servicios/listarSiniestroAsistencia'));


//Registrar,listar,modificar,eliminar Vehiculo
app.use('/registroVehiculo', require('./servicios/registroVehiculo'));
app.use('/listarVehiculo', require('./servicios/listarVehiculo'));
app.use('/modificarVehiculo', require('./servicios/modificarVehiculo'));
app.use('/eliminarVehiculo', require('./servicios/eliminarVehiculo'));

//Registrar,listar,modificar,eliminar Vehiculo
app.use('/registroVehiculoUEps', require('./servicios/registroVehiculoUEps'));
app.use('/listarVehiculoUEps', require('./servicios/listarVehiculoUEps'));
app.use('/modificarVehiculoUEps', require('./servicios/modificarVehiculoUEps'));
app.use('/eliminarVehiculoUEps', require('./servicios/eliminarVehiculoUEps'));

//Registrar,listar,modificar,eliminar Caracteristicas de vehiculo
app.use('/registroCaracteristicaVehiculo', require('./servicios/registroCaracteristicaVehiculo'));
app.use('/listarCaracteristicasVehiculo', require('./servicios/listarCaracteristicasVehiculo'));
app.use('/eliminarCaracteristicasVehiculo', require('./servicios/eliminarCaracteristicasVehiculo'));
app.use('/modificarCaracteristicasVehiculo', require('./servicios/modificarCaracteristicasVehiculo'));

//Registrar,listar,modificar,eliminar Categoria Incidente 
app.use('/registroCategoriaIncidente', require('./servicios/registroCategoriaIncidente'));
app.use('/listarCategoriaIncidente', require('./servicios/listarCategoriaIncidente'));
app.use('/modificarCategoriaIncidente', require('./servicios/modificarCategoriaIncidente'));
app.use('/eliminarCategoriaIncidente', require('./servicios/eliminarCategoriaIncidente'));

//Registrar,listar,modificar,eliminar Tipo Vehiculo 
app.use('/registroTipoVehiculo', require('./servicios/registroTipoVehiculo'));
app.use('/listarTipoVehiculo', require('./servicios/listarTipoVehiculo'));
app.use('/modificarTipoVehiculo', require('./servicios/modificarTipoVehiculo'));
app.use('/eliminarTipoVehiculo', require('./servicios/eliminarTipoVehiculo'));

//Registrar,listar,modificar,eliminar Metodo Pago
app.use('/registroMetodoPago', require('./servicios/registroMetodoPago'));
app.use('/listarMetodoPago', require('./servicios/listarMetodoPago'));
app.use('/modificarMetodoPago', require('./servicios/modificarMetodoPago'));
app.use('/eliminarMetodoPago', require('./servicios/eliminarMetodoPago'));


//Registrar,listar,modificar,eliminar tipo de asistencia
app.use('/listarTiposAsistencia', require('./servicios/listarTipoAsistencia'));
app.use('/registroTipoAsistencia', require('./servicios/registroTipoAsistencia'));
app.use('/modificarTipoAsistencia', require('./servicios/modificarTipoAsistencia'));
app.use('/eliminarTipoAsistencia', require('./servicios/eliminarTipoAsistencia'));






app.listen(5252, function () {
    console.log("servidor corriendo en el puerto 5252")
});