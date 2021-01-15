
  const nodemailer = require("nodemailer");
  var express = require("express");
  var router = express.Router();
  var mongoose = require("mongoose");
  
 
const listarVehiculos = require('../schema/modeloVehiculo');

  
  
  router.post("/recibir", function(req, res) { 
   
    identificador=req.body.identificador
    
  
    listarVehiculos
      .find({identificador:identificador})
      .then(function(resultado) {
        res.json(resultado);
      })
    
      .catch(function(error) {
        console.log(error);
      }); 
  
  });

  router.post("/recibir2", function(req, res) { 
   
    chofer= req.body.chofer
  
    listarVehiculos
      .find({chofer:chofer})
      .then(function(resultado) {
        res.json(resultado);
      })
    
      .catch(function(error) {
        console.log(error);
      }); 
  
  });
  

  router.post("/recibir3", function(req, res) { 
   
    id=req.body.id
    
  
    listarVehiculos
      .find({_id:id})
      .then(function(resultado) {
        res.json(resultado);
      })
    
      .catch(function(error) {
        console.log(error);
      }); 
  
  });
  
    module.exports = router;