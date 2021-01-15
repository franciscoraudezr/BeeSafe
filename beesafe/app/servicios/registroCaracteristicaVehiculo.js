var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var CaracteristicaVehiculo = require("../schema/modeloCaracteristicaVehiculo");

router.post("/insertar", function(req, res) {
  var caracteristicaVehiculoNuevo = new CaracteristicaVehiculo({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });
  caracteristicaVehiculoNuevo
    .save()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(error) {
      console.log(error);
    });
});
module.exports = router;
