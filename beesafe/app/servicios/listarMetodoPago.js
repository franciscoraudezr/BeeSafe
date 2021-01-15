
  const nodemailer = require("nodemailer");
  var express = require("express");
  var router = express.Router();
  var mongoose = require("mongoose");
  
 
const listarMetodoPago = require('../schema/modeloMetodoPago');

  
  
  router.post("/recibir", function(req, res) { 
  
  
    identificador=req.body.identificador
  
    listarMetodoPago
      .find({identificador:identificador})
      .then(function(resultado) {
        res.json(resultado);
      })
      .then(function (resultado) {
  
        
        
      })
      .catch(function(error) {
        console.log(error);
      });
   
  
    
    
  
  });
  
    module.exports = router;