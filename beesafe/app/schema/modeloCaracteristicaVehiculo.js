var mongoose = require("mongoose");

var caracteristicasVehiculoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  descripcion: String,
});

module.exports = mongoose.model( "CaracteristicasVehiculo", caracteristicasVehiculoSchema ,"CaracteristicasVehiculos");