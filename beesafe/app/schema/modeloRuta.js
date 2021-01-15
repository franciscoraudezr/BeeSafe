var mongoose = require("mongoose");

var rutaSchemas = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre:String,
  coordenada:String,
  estado:Number
});

module.exports = mongoose.model( "Ruta", rutaSchemas,"Rutas");
