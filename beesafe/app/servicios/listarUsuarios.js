const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Usuario = require('../schema/modeloUsuarios.js');


router.post("/recibir", function(req, res) { 


  tipoUsuario=req.body.tipoUsuario

  if (tipoUsuario<5) {
     Usuario
    .find({tipoUsuario:tipoUsuario})
    .then(function(resultado) {
      res.json(resultado);
    })
    .catch(function(error) {
      console.log(error);
    });
  }else{
    Usuario
  .find()
  .then(function(resultado) {
    res.json(resultado);
  })
  .catch(function(error) {
    console.log(error);
  });
 
  }
  
  

});

  module.exports = router;