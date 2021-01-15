const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


var CrearRuta = require("../schema/modeloRuta");

router.post("/insertar", async function (req, res) {

  var crearRuta = new CrearRuta({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    coordenada: req.body.coordenada,
    estado: req.body.estado
  });

  crearRuta.save()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (error) {
      console.log(error);
    });

});


module.exports = router;
