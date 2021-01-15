var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var TipoVehiculo = require("../schema/modeloTipoVehiculo");


router.post("/insertar", async function (req, res) {

  var tipoVehiculoNuevo = new TipoVehiculo({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    caracteristica: req.body.caracteristica,
    descripcion: req.body.descripcion
  });

  console.log(tipoVehiculoNuevo);

  tipoVehiculoNuevo.save()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });

});


module.exports = router;
