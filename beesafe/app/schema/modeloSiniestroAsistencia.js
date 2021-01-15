var mongoose = require("mongoose");

var modeloSiniestroAsistencia = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  categoriaIncidente:String,
  rutaIncidente: String,
  descripcionIncidente: String,
  iconoIncidente:String,
  image: String,
  longitud: Number,
  latitud: Number,
  metodoPago:String,
  tipoAsistencia:String,
  usuarioSolicitante: String,
  usuarioEspecializado:String,
  estado:Number
});

module.exports = mongoose.model( "SiniestroAsistencia", modeloSiniestroAsistencia,"SiniestroAsistencias");


/* 
iconoIncidente,
image: String,
longitud: Number,
latitud: Number,
usuarioSolicitante: String, */