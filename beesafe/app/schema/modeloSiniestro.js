var mongoose = require("mongoose");
var siniestroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   ruta: String,
   asistencia: Boolean,
    tipoSiniestro: String,
    descripcion: String,
    longitude: String,
    latitude: String
  });
  
  module.exports = mongoose.model("Siniestro",siniestroSchema, "Siniestros");
  