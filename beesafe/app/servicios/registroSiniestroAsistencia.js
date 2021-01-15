const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Asistencia = require("../schema/modeloSiniestroAsistencia");


router.post("/insertar", async function (req, res) {
  //console.log(req.file);
  var asistenciaNueva = new Asistencia({
    _id: new mongoose.Types.ObjectId(),

    estado:0,
    categoriaIncidente: req.body.categoriaIncidente,
    rutaIncidente: req.body.rutaIncidente,
    descripcionIncidente: req.body.descripcionIncidente,
    iconoIncidente: req.body.iconoIncidente,
    image: '/assets/uploads/' + req.file.originalname,
    longitud: req.body.longitud,
    latitud: req.body.latitud,
    metodoPago: req.body.metodoPago,
    tipoAsistencia: req.body.tipoAsistencia,
    usuarioSolicitante: req.body.usuarioSolicitante
  });
  console.log(asistenciaNueva.image);

  asistenciaNueva
    .save()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });


});


module.exports = router;
