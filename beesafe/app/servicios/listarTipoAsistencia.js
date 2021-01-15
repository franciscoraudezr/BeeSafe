var express = require("express");
var router = express.Router();

var listarTipoAsistencia = require('../schema/modeloTipoAsistencia.js');


router.get("/recibir", function(req, res) { 

  listarTipoAsistencia.find().exec()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  
  });
  
  module.exports = router;

  