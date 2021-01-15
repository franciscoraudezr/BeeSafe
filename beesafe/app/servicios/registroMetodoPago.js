const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");


var MetodoPago = require("../schema/modeloMetodoPago");

router.post("/insertar", async function(req, res) {


  
  var metodoPagoNuevo = new MetodoPago({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    numeroTarjeta: req.body.numeroTarjeta,
    fecha: req.body.fecha,
    cvv: req.body.cvv,
    identificador:req.body.identificador
   
  });

  metodoPagoNuevo.save()
    .then(function(resultado) {
      res.json(resultado);
    })
    .catch(function(error) {
      console.log(error);
    });

  

});


module.exports = router;
