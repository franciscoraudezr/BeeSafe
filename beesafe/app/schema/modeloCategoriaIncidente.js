var mongoose = require("mongoose");

var categoriaIncidenteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  descripcion: String,
  image: String
});

module.exports = mongoose.model("CategoriaIncidente", categoriaIncidenteSchema, "CategoriaIncidentes");
