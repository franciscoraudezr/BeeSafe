var mongoose = require("mongoose");

var metodoPagoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre:String,
  numeroTarjeta: String,
  fecha: String,
  cvv: Number,
  identificador:String
 
});

module.exports = mongoose.model( "MetodoPago", metodoPagoSchema,"MetodoPagos");
