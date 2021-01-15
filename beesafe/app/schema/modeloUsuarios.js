var mongoose = require("mongoose");

var usuarios = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipoUsuario:Number,
  nombre: String,
  apellido: String,
  edad: Number,
  correo: String,
  password: String,
  tipoCedula: String,
  cedula: Number,
  tipoAsistencia: String,
  image: String,
  metodoPago: Object,
});

module.exports = mongoose.model( "Usuario", usuarios,"Usuarios");
