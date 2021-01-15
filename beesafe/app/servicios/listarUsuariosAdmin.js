

const nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Usuario = require('../schema/modeloUsuarios.js');


router.post("/recibir", function(req, res) { 


  id=req.body.id

     Usuario
    .find({_id:id})
    .then(function(resultado) {
      res.json(resultado);
    })
    .catch(function(error) {
      console.log(error);
    });
 

  
  

});

  module.exports = router;