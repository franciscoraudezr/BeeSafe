const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


var siniestro = require("../schema/modeloSiniestro");

router.post("/insertar", async function(req, res) {


  
  console.log("x");
  var siniestroNuevo = new siniestro({
    _id: new mongoose.Types.ObjectId(),
    ruta: req.body.ruta,
    asistencia: req.body.asistencia,
    tipoSiniestro: req.body.tipoSiniestro,
    descripcion: req.body.descripcion,
    longitude: req.body.longitude,
    latitude: req.body.latitude
   
  });
  console.log("y");
  siniestroNuevo.save()
    .then(function(resultado) {
      res.json(resultado);
      console.log("result");
    })
    .catch(function(error) {
      console.log("error");
      console.log(error);
    });

  

});


module.exports = router;
