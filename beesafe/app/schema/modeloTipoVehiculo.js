var mongoose = require("mongoose");

var tipoVehiculoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  caracteristica: String,
  descripcion: String
});

module.exports = mongoose.model("TipoVehiculo", tipoVehiculoSchema, "TipoVehiculos");
