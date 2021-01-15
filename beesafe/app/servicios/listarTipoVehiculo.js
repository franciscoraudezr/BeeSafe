var express = require("express");
var router = express.Router();

var ListarTipoVehiculo = require('../schema/modeloTipoVehiculo.js');


router.get("/recibir", function(req, res) { 

    ListarTipoVehiculo.find().exec()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  
  });
  
  module.exports = router;